'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

/* =========================================================================
   LIQUID METAL SHADERS (5-pass WebGL2 Dispersion & Ripple Engine)
   ========================================================================= */
const VERT_SRC = `#version 300 es
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

const HEAD_SRC = `#version 300 es
precision highp float;
out vec4 o;

uniform vec2  uC;
uniform vec2  uHalf;
uniform float uT;
uniform float uHover;
uniform float uPress;
uniform vec4  uRip[3];
uniform vec4  uRipK;
uniform vec4  uRipK2;
uniform vec4  uPtr;
uniform vec4  uPtrK;

#define PI 3.14159265

float sdPill(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float ripple(vec2 p, float t){
  float sum = 0.0;
  for(int i = 0; i < 3; i++){
    if(uRip[i].w < 0.5) continue;
    float age = t - uRip[i].z;
    if(age < 0.0 || age > 4.0) continue;
    vec2  rp = p - uRip[i].xy;
    float facet = 1.0 + uRipK2.x * cos(uRipK2.y * atan(rp.y, rp.x) + age * 2.1 + float(i) * 2.4);
    float x = (length(rp) - age * uRipK.x * facet) / uRipK.y;
    sum += exp(-pow(abs(x) + 1e-4, uRipK2.z)) * exp(-age * uRipK.z);
  }
  return sum;
}

float pointerW(vec2 p){
  if(uPtr.z < 0.001) return 0.0;
  float d = length(p - uPtr.xy) / uPtrK.x;
  return exp(-d * d) * uPtr.z;
}

vec2 pointerWarp(vec2 p){
  float w = pointerW(p);
  if(w <= 0.0) return vec2(0.0);
  return normalize(p - uPtr.xy + vec2(1e-5)) * w * (uPtrK.y + uPtrK.z * uPtr.w);
}
`;

const FRAG_RIM_SRC = HEAD_SRC + `
uniform float uBw;
uniform float uE[8];

float perim(vec2 d, float a, float r){
  float P = 4.0 * a + 2.0 * PI * r;
  float s;
  if(d.x >= a){
    float th = atan(d.y, d.x - a); if(th < 0.0) th += 2.0 * PI;
    s = (th <= PI * 0.5) ? r * th : P - r * (2.0 * PI - th);
  } else if(d.x <= -a){
    float th = atan(d.y, d.x + a); if(th < 0.0) th += 2.0 * PI;
    s = r * PI * 0.5 + 2.0 * a + r * (th - PI * 0.5);
  } else if(d.y >= 0.0){
    s = r * PI * 0.5 + (a - d.x);
  } else {
    s = r * PI * 1.5 + 2.0 * a + (d.x + a);
  }
  return s / P;
}

float pb(float u, float w){ u = fract(u); float x = min(u, 1.0 - u); return exp(-(x * x) / (w * w)); }

float rimHot(float s, float t){
  float v = uE[0];
  v += 0.62 * pb(s - t * uE[4], 0.075);
  v += 0.44 * pb(s + t * uE[4] * 0.63 + 0.41, 0.135);
  v += 0.30 * pb(s - t * uE[4] * 0.34 + 0.73, 0.200);
  return v;
}

float rimBand(float sd, float off){ return 1.0 - smoothstep(0.0, uBw * 1.05, abs(sd + uBw * 0.55 + off)); }

void main(){
  vec2  d  = gl_FragCoord.xy - uC;
  float sd = sdPill(d, uHalf, uHalf.y);
  if(sd > uBw * 2.5 || sd < -uBw * 3.5){ o = vec4(0.0); return; }

  float a = max(uHalf.x - uHalf.y, 0.0);
  float s = perim(d, a, uHalf.y);
  float top = mix(1.0, 0.5 + 0.5 * (d.y / uHalf.y), uE[5]);

  vec2  p   = vec2(d.x, -d.y) / (uHalf.y * 2.0);
  float lift = 1.0 + uPress * uE[6] + ripple(p, uT) * uE[7] + pointerW(p) * uPtrK.w;

  o = vec4(vec3(
    rimBand(sd,  uE[2]) * rimHot(s + uE[3], uT),
    rimBand(sd,  0.0  ) * rimHot(s,         uT),
    rimBand(sd, -uE[2]) * rimHot(s - uE[3], uT)
  ) * uE[1] * top * lift, 1.0);
}
`;

const FRAG_SCENE_SRC = HEAD_SRC + `
uniform float uP[21];

float h21(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vn(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = h21(i), b = h21(i + vec2(1.0, 0.0)), c = h21(i + vec2(0.0, 1.0)), d = h21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y) * 2.0 - 1.0;
}

float fbm(vec2 p, float g){
  float s = 0.0, a = 1.0, n = 0.0;
  for(int i = 0; i < 4; i++){ s += a * vn(p); n += a; p = p * 2.03 + 11.7; a *= g; }
  return s / n;
}

float wig(float x, float t, float seed){
  return vn(vec2(x, t * 0.150 + seed)) * 0.60
       + vn(vec2(x * 2.07 + 4.0, t * 0.105 + seed)) * 0.27
       + vn(vec2(x * 4.30 - 7.0, t * 0.080 + seed)) * 0.13;
}

float valleyAt(vec2 p, float t){ return wig(p.x * uP[0], t, 0.0) * uP[1]; }
float densAt  (vec2 p, float t){ return uP[2] * exp(uP[3] * wig(p.x * uP[4] + 9.0, t, 2.7)); }

float surface(vec2 p, float t){
  float V = (p.y - valleyAt(p, t)) * densAt(p, t);
  V += uP[5] * fbm(p * vec2(0.8, 1.7) * uP[6] + vec2(t * 0.05, -t * 0.03), uP[17]);
  return V - uP[7];
}

float tone(float v){
  float u = fract(v);
  float e = uP[9], W = uP[10] * 0.5;
  return smoothstep(0.5 - W - e, 0.5 - W, u) * (1.0 - smoothstep(0.5 + W, 0.5 + W + e, u));
}

vec3 spec(float t){ return clamp(vec3(1.5) - abs(4.0 * t - vec3(3.0, 2.0, 1.0)), 0.0, 1.0); }

void main(){
  vec2  d  = gl_FragCoord.xy - uC;
  float sd = sdPill(d, uHalf, uHalf.y);
  float pill = 1.0 - smoothstep(-1.0, 1.0, sd);
  float S = uHalf.y * 2.0;
  float t = uT;

  if(uHover <= 0.0015 || pill <= 0.0015){ o = vec4(0.0, 0.0, 0.0, pill); return; }

  vec2  p = vec2(d.x, -d.y) / S;
  vec2  q = p + pointerWarp(p);

  float h0 = surface(q, t);
  vec2  gp = vec2(dFdx(h0), -dFdy(h0)) * S;
  float V  = surface(q - gp * uP[8] / max(uP[2], 0.001), t);

  vec2  gd = normalize(gp + vec2(1e-5));
  V += uP[13] * fbm(vec2(dot(q, gd) * uP[14], dot(q, vec2(-gd.y, gd.x)) * uP[14] * 0.04) + vec2(0.0, t * 0.06), 0.5);

  float rip  = ripple(p, t);
  float well = pointerW(p);
  V += rip * uRipK.w;

  const int N = 21;
  float mid = 1.0 - pow(0.5, uP[12]);
  vec3 col = vec3(0.0), wsum = vec3(0.0);
  for(int i = 0; i < N; i++){
    float k = float(i) / float(N - 1);
    vec3  w = spec(k);
    col  += w * tone(V + ((1.0 - pow(1.0 - k, uP[12])) - mid) * uP[11]);
    wsum += w;
  }
  col /= wsum;
  col = pow(col, vec3(uP[15]));

  float lit = smoothstep(uP[18], uP[19], q.y - valleyAt(q, t));
  lit *= mix(1.0, lit, 0.55);
  col *= uP[16] * lit;

  col = col * (1.0 + rip * 1.15 + well * 0.60);
  o = vec4(col * pill * uHover, pill);
}
`;

const FRAG_DOWN_SRC = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uTex, uTex2;
uniform vec2 uDstTexel;
uniform vec2 uSrcTexel;
uniform float uAdd;
void main(){
  vec2 uv = gl_FragCoord.xy * uDstTexel;
  vec2 e = uDstTexel * 0.25;
  vec4 s = texture(uTex, uv + vec2(-e.x, -e.y)) + texture(uTex, uv + vec2(e.x, -e.y))
         + texture(uTex, uv + vec2(-e.x,  e.y)) + texture(uTex, uv + vec2(e.x,  e.y));
  s *= 0.25;
  if(uAdd > 0.5){
    vec4 r = texture(uTex2, uv + vec2(-e.x, -e.y)) + texture(uTex2, uv + vec2(e.x, -e.y))
           + texture(uTex2, uv + vec2(-e.x,  e.y)) + texture(uTex2, uv + vec2(e.x,  e.y));
    s.rgb += r.rgb * 0.25;
  }
  o = s;
}
`;

const FRAG_BLUR_SRC = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uTex;
uniform vec2 uTexel;
uniform vec2 uDir;
uniform float uR;
void main(){
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec2 st = uTexel * uDir * uR;
  vec4 s = texture(uTex, uv) * 0.1964;
  s += (texture(uTex, uv + st * 1.4118) + texture(uTex, uv - st * 1.4118)) * 0.2969;
  s += (texture(uTex, uv + st * 3.2941) + texture(uTex, uv - st * 3.2941)) * 0.0944;
  s += (texture(uTex, uv + st * 5.1765) + texture(uTex, uv - st * 5.1765)) * 0.0104;
  o = s;
}
`;

const FRAG_COMP_SRC = HEAD_SRC + `
uniform sampler2D uSoft, uRim, uGlow;
uniform vec2  uRes;
uniform float uGlowGain, uGlowIn, uOccl, uDim, uPunch;

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 glow = texture(uGlow, uv).rgb;

  vec2  d    = gl_FragCoord.xy - uC;
  float sd   = sdPill(d, uHalf, uHalf.y);
  float pill = 1.0 - smoothstep(-1.0, 1.0, sd);

  vec4 m = texture(uSoft, uv);
  float veil = 1.0 - smoothstep(0.46, 0.88, abs(d.y) / uHalf.y);
  vec3 metal = pow(max(m.rgb / max(m.a, 1e-3), 0.0), vec3(uPunch));
  vec3 core = metal * pill * mix(1.0, uDim, veil) + texture(uRim, uv).rgb;

  float rip = ripple(vec2(d.x, -d.y) / (uHalf.y * 2.0), uT);
  core += vec3(rip * rip) * uRipK2.w * pill * mix(1.0, 0.42, veil);

  float sdSh = sdPill(d + vec2(0.0, uHalf.y * 0.62), uHalf * 0.94, uHalf.y * 0.94);
  float occl = uOccl * exp(-max(sdSh, 0.0) / (uHalf.y * 0.75));

  vec3 rgb = core + glow * uGlowGain * mix(1.0, uGlowIn, pill) * (1.0 - occl * (1.0 - pill));
  float a = clamp(max(rgb.r, max(rgb.g, rgb.b)), 0.0, 1.0);
  o = vec4(min(rgb, vec3(1.0)), a);
}
`;

/* =========================================================================
   HOOK: MOUNT WEBGL2 LIQUID METAL
   ========================================================================= */
function useLiquidMetal(canvasRef: React.RefObject<HTMLCanvasElement | null>, hostRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const cv = canvasRef.current;
    const stage = hostRef.current;
    if (!cv || !stage) return;
    const cvEl: HTMLCanvasElement = cv;
    const stageEl: HTMLElement = stage;

    const glRaw = cvEl.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance'
    });
    if (!glRaw) return;
    const gl: WebGL2RenderingContext = glRaw;

    function sh(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    function prog(fs: string) {
      const p = gl.createProgram()!;
      gl.attachShader(p, sh(gl.VERTEX_SHADER, VERT_SRC));
      gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
      gl.bindAttribLocation(p, 0, 'position');
      gl.linkProgram(p);
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i)!;
        u[info.name.replace('[0]', '')] = gl.getUniformLocation(p, info.name);
      }
      return { p, u };
    }

    const pScene = prog(FRAG_SCENE_SRC);
    const pRim = prog(FRAG_RIM_SRC);
    const pDown = prog(FRAG_DOWN_SRC);
    const pBlur = prog(FRAG_BLUR_SRC);
    const pComp = prog(FRAG_COMP_SRC);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const hasFloat = !!gl.getExtension('EXT_color_buffer_half_float');

    function makeTarget() {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo, w: 0, h: 0 };
    }

    function sizeTarget(t: ReturnType<typeof makeTarget>, w: number, h: number) {
      if (t.w === w && t.h === h) return;
      t.w = w; t.h = h;
      gl.bindTexture(gl.TEXTURE_2D, t.tex);
      if (hasFloat) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    const T_core = makeTarget(), T_rim = makeTarget();
    const T_s1 = makeTarget(), T_s2 = makeTarget();
    const T_a = makeTarget(), T_b = makeTarget();

    let W = 0, H = 0, DPR = 1, BW = 0, BH = 0, CX = 0, CY = 0;
    let DOWN = 4;
    const GLOW_TEX = 129;
    let needResize = true;

    function resize() {
      const r = stageEl.getBoundingClientRect();
      const btn = stageEl.querySelector('.liquid-button') as HTMLElement;
      const br = btn ? btn.getBoundingClientRect() : r;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(2, Math.round(r.width * DPR));
      const h = Math.max(2, Math.round(r.height * DPR));
      if (w !== W || h !== H) { W = w; H = h; cvEl.width = W; cvEl.height = H; }
      BW = br.width * DPR; BH = br.height * DPR;
      CX = (br.left - r.left) * DPR + BW / 2;
      CY = H - ((br.top - r.top) * DPR + BH / 2);
      sizeTarget(T_core, W, H); sizeTarget(T_rim, W, H);
      const hw = Math.max(2, Math.ceil(W / 2)), hh = Math.max(2, Math.ceil(H / 2));
      sizeTarget(T_s1, hw, hh); sizeTarget(T_s2, hw, hh);
      DOWN = Math.max(1, Math.min(4, Math.round(BH / GLOW_TEX)));
      const dw = Math.max(2, Math.ceil(W / DOWN)), dh = Math.max(2, Math.ceil(H / DOWN));
      sizeTarget(T_a, dw, dh); sizeTarget(T_b, dw, dh);
      needResize = false;
    }

    const ro = new ResizeObserver(() => { needResize = true; });
    ro.observe(stageEl);

    function drawTo(t: ReturnType<typeof makeTarget> | null) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t ? t.fbo : null);
      gl.viewport(0, 0, t ? t.w : W, t ? t.h : H);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const P = [0.50, 0.55, 2.40, 2.20, 0.32, 0.12, 1.60, 0.05, 0.18, 0.04, 0.46, 0.30, 1.50, 0.0, 9.0, 1.00, 1.90, 0.32, -0.26, 0.10, 0.44];
    const E = [0.20, 0.82, 0.42, 0.030, 0.070, 0.35, 0.85, 1.60];
    const uArr = new Float32Array(P);
    const eArr = new Float32Array(E);

    let hover = 0, hoverTarget = 0, clock = 0, last = performance.now();
    const RIP = [0, 1, 2].map(() => ({ x: 0, y: 0, t: -99, on: 0 }));
    const ripArr = new Float32Array(12);
    let ripNext = 0, press = 0, pressTarget = 0;
    const ptr = { x: 0, y: 0 }, ptrS = { x: 0, y: 0 };
    let ptrAmt = 0, ptrSpeed = 0;

    function addRipple(x: number, y: number) {
      const r = RIP[ripNext];
      ripNext = (ripNext + 1) % RIP.length;
      r.x = x; r.y = y; r.t = clock; r.on = 1;
    }

    function localPt(e: PointerEvent | MouseEvent) {
      const btn = (stageEl.querySelector('.liquid-button') as HTMLElement) || stageEl;
      const b = btn.getBoundingClientRect(), s = b.height || 1;
      return [(e.clientX - (b.left + b.width / 2)) / s, (e.clientY - (b.top + b.height / 2)) / s];
    }

    const onState = { over: false, press: false, focus: false };
    const syncState = () => {
      hoverTarget = (onState.over || onState.press || onState.focus) ? 1 : 0;
      pressTarget = onState.press ? 1 : 0;
      stageEl.classList.toggle('hot', hoverTarget > 0.5);
      stageEl.classList.toggle('press', onState.press);
    };

    const btn = stageEl.querySelector('.liquid-button') as HTMLElement;
    if (btn) {
      btn.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        const [px, py] = localPt(e);
        ptr.x = px; ptr.y = py;
        ptrS.x = ptr.x; ptrS.y = ptr.y; ptrSpeed = 0;
        onState.over = true; syncState();
      });
      btn.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') { onState.over = false; syncState(); }
      });
      btn.addEventListener('pointerdown', (e) => {
        const [px, py] = localPt(e);
        ptr.x = px; ptr.y = py;
        onState.press = true; syncState();
        addRipple(ptr.x, ptr.y);
      });
    }

    const onWinMove = (e: PointerEvent) => {
      if (!onState.over && !onState.press) return;
      const [px, py] = localPt(e);
      ptr.x = px; ptr.y = py;
    };
    const onWinUp = () => { onState.press = false; syncState(); };

    window.addEventListener('pointermove', onWinMove, { passive: true });
    window.addEventListener('pointerup', onWinUp);

    let rafId = 0;
    const frameLoop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += dt;

      const k = hoverTarget > hover ? 1 - Math.pow(0.0012, dt) : 1 - Math.pow(0.00012, dt);
      hover += (hoverTarget - hover) * k;
      const pk = pressTarget > press ? 1 - Math.pow(1e-9, dt) : 1 - Math.pow(0.004, dt);
      press += (pressTarget - press) * pk;

      for (let i = 0; i < RIP.length; i++) {
        const r = RIP[i];
        if (r.on && clock - r.t > 4) r.on = 0;
        ripArr[i * 4] = r.x; ripArr[i * 4 + 1] = r.y; ripArr[i * 4 + 2] = r.t; ripArr[i * 4 + 3] = r.on;
      }

      const lag = 1 - Math.pow(0.0016, dt);
      const dx = (ptr.x - ptrS.x) * lag, dy = (ptr.y - ptrS.y) * lag;
      ptrS.x += dx; ptrS.y += dy;
      const inst = Math.min(Math.hypot(dx, dy) / Math.max(dt, 1e-3) / 4.5, 1);
      ptrSpeed += (inst - ptrSpeed) * (1 - Math.pow(inst > ptrSpeed ? 0.001 : 0.02, dt));
      const wantWell = (onState.over || onState.press) ? 1 : 0;
      ptrAmt += (wantWell - ptrAmt) * (1 - Math.pow(0.004, dt));

      if (needResize) resize();

      const bw = Math.max(1.5, 3.2 * (BH / 516));

      // 1. Scene
      gl.useProgram(pScene.p);
      gl.uniform2f(pScene.u.uC, CX, CY);
      gl.uniform2f(pScene.u.uHalf, BW / 2, BH / 2);
      gl.uniform1f(pScene.u.uT, clock);
      gl.uniform1f(pScene.u.uHover, hover);
      gl.uniform1f(pScene.u.uPress, press);
      gl.uniform4fv(pScene.u.uRip, ripArr);
      gl.uniform4f(pScene.u.uRipK, 1.85, 0.20, 1.35, 1.35);
      gl.uniform4f(pScene.u.uRipK2, 0.18, 6.0, 1.15, 0.45);
      gl.uniform4f(pScene.u.uPtr, ptrS.x, ptrS.y, ptrAmt, ptrSpeed);
      gl.uniform4f(pScene.u.uPtrK, 0.55, 0.32, 0.40, 0.80);
      gl.uniform1fv(pScene.u.uP, uArr);
      drawTo(T_core);

      // 2. Rim
      gl.useProgram(pRim.p);
      gl.uniform2f(pRim.u.uC, CX, CY);
      gl.uniform2f(pRim.u.uHalf, BW / 2, BH / 2);
      gl.uniform1f(pRim.u.uT, clock);
      gl.uniform1f(pRim.u.uBw, bw);
      gl.uniform1f(pRim.u.uPress, press);
      gl.uniform4fv(pRim.u.uRip, ripArr);
      gl.uniform4f(pRim.u.uRipK, 1.85, 0.20, 1.35, 1.35);
      gl.uniform4f(pRim.u.uRipK2, 0.18, 6.0, 1.15, 0.45);
      gl.uniform4f(pRim.u.uPtr, ptrS.x, ptrS.y, ptrAmt, ptrSpeed);
      gl.uniform4f(pRim.u.uPtrK, 0.55, 0.32, 0.40, 0.80);
      gl.uniform1fv(pRim.u.uE, eArr);
      drawTo(T_rim);

      // 3. Soften
      gl.useProgram(pDown.p);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, T_core.tex);
      gl.uniform1i(pDown.u.uTex, 0);
      gl.uniform1f(pDown.u.uAdd, 0);
      gl.uniform2f(pDown.u.uDstTexel, 1 / T_s1.w, 1 / T_s1.h);
      gl.uniform2f(pDown.u.uSrcTexel, 1 / W, 1 / H);
      drawTo(T_s1);

      gl.useProgram(pBlur.p);
      gl.uniform1i(pBlur.u.uTex, 0);
      gl.uniform2f(pBlur.u.uTexel, 1 / T_s1.w, 1 / T_s1.h);
      const sigTex = 0.24 * (BH * 0.5) * 0.95;
      if (sigTex > 0.1) {
        const iters = Math.min(4, Math.max(1, Math.ceil(sigTex / 3.0)));
        gl.uniform1f(pBlur.u.uR, sigTex / Math.sqrt(iters) / 1.95);
        for (let i = 0; i < iters; i++) {
          gl.bindTexture(gl.TEXTURE_2D, T_s1.tex); gl.uniform2f(pBlur.u.uDir, 1, 0); drawTo(T_s2);
          gl.bindTexture(gl.TEXTURE_2D, T_s2.tex); gl.uniform2f(pBlur.u.uDir, 0, 1); drawTo(T_s1);
        }
      }

      // 4. Bloom
      gl.useProgram(pDown.p);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, T_s1.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, T_rim.tex);
      gl.uniform1i(pDown.u.uTex, 0);
      gl.uniform1i(pDown.u.uTex2, 1);
      gl.uniform1f(pDown.u.uAdd, 1);
      gl.uniform2f(pDown.u.uDstTexel, 1 / T_a.w, 1 / T_a.h);
      gl.uniform2f(pDown.u.uSrcTexel, 1 / T_s1.w, 1 / T_s1.h);
      drawTo(T_a);

      gl.useProgram(pBlur.p);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(pBlur.u.uTex, 0);
      gl.uniform2f(pBlur.u.uTexel, 1 / T_a.w, 1 / T_a.h);
      const rs = 1.30 * (BH / DOWN) / GLOW_TEX;
      for (const r of [1.0, 2.3, 5.2, 9.0].map(v => v * rs)) {
        gl.uniform1f(pBlur.u.uR, r);
        gl.bindTexture(gl.TEXTURE_2D, T_a.tex); gl.uniform2f(pBlur.u.uDir, 1, 0); drawTo(T_b);
        gl.bindTexture(gl.TEXTURE_2D, T_b.tex); gl.uniform2f(pBlur.u.uDir, 0, 1); drawTo(T_a);
      }

      // 5. Composite
      gl.useProgram(pComp.p);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, T_s1.tex); gl.uniform1i(pComp.u.uSoft, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, T_rim.tex); gl.uniform1i(pComp.u.uRim, 1);
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, T_a.tex); gl.uniform1i(pComp.u.uGlow, 2);
      gl.uniform2f(pComp.u.uRes, W, H);
      gl.uniform2f(pComp.u.uC, CX, CY);
      gl.uniform2f(pComp.u.uHalf, BW / 2, BH / 2);
      gl.uniform1f(pComp.u.uT, clock);
      gl.uniform4fv(pComp.u.uRip, ripArr);
      gl.uniform4f(pComp.u.uRipK, 1.85, 0.20, 1.35, 1.35);
      gl.uniform4f(pComp.u.uRipK2, 0.18, 6.0, 1.15, 0.45);
      gl.uniform1f(pComp.u.uGlowGain, 1.95);
      gl.uniform1f(pComp.u.uGlowIn, 0.30);
      gl.uniform1f(pComp.u.uOccl, 0.62);
      gl.uniform1f(pComp.u.uDim, 0.44);
      gl.uniform1f(pComp.u.uPunch, 1.50);
      drawTo(null);

      rafId = requestAnimationFrame(frameLoop);
    };

    resize();
    rafId = requestAnimationFrame(frameLoop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
    };
  }, [canvasRef, hostRef]);
}

/* =========================================================================
   SYLVA HERO COMPONENT (LIVING WORLD THREE.JS + FLOATING DOCK + LIQUID METAL)
   ========================================================================= */
export default function SylvaHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const liquidFxRef = useRef<HTMLCanvasElement>(null);
  const liquidStageRef = useRef<HTMLDivElement>(null);

  const [activeNav, setActiveNav] = useState('home');

  // Mount WebGL2 Liquid Metal on Explore CTA
  useLiquidMetal(liquidFxRef, liquidStageRef);

  // Mount Three.js Living Organic Scene
  useEffect(() => {
    const canvas = canvas3dRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 10, 3000);
    camera.position.set(0, 0, 1400);

    // Procedural Organic Flow Geometry
    const curvePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 39) * Math.PI * 2;
      const x = Math.cos(t * 1.5) * 480 + Math.sin(t * 3.0) * 120;
      const y = Math.sin(t * 1.2) * 260 + Math.cos(t * 2.4) * 80 - 80;
      const z = Math.sin(t * 2.0) * 160;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const tubeGeo = new THREE.TubeGeometry(curve, 180, 22, 16, true);

    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#00A19B'),
      emissive: new THREE.Color('#00423f'),
      roughness: 0.35,
      metalness: 0.65,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: false,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);

    // Secondary inner wire rib
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#E4DDD3'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(tubeGeo, wireMat);
    wireMesh.scale.set(1.08, 1.08, 1.08);
    scene.add(wireMesh);

    // Floating motes / spores
    const motesCount = 140;
    const motesGeo = new THREE.BufferGeometry();
    const motesPos = new Float32Array(motesCount * 3);
    const motesVel: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < motesCount; i++) {
      motesPos[i * 3] = (Math.random() - 0.5) * 1600;
      motesPos[i * 3 + 1] = (Math.random() - 0.5) * 900;
      motesPos[i * 3 + 2] = (Math.random() - 0.5) * 600;
      motesVel.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.3 + 0.15,
        z: (Math.random() - 0.5) * 0.3
      });
    }
    motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPos, 3));

    const motesMat = new THREE.PointsMaterial({
      color: new THREE.Color('#5eead4'),
      size: 4,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const motesMesh = new THREE.Points(motesGeo, motesMat);
    scene.add(motesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x5eead4, 3.5);
    dirLight1.position.set(400, 600, 800);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00A19B, 2.8);
    dirLight2.position.set(-600, -400, 500);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 900);
    pointLight.position.set(0, 100, 300);
    scene.add(pointLight);

    let rafId = 0;
    let clock = new THREE.Clock();

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.targetX = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function resize3d() {
      const w = hero?.clientWidth || window.innerWidth;
      const h = hero?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize3d();
    window.addEventListener('resize', resize3d);

    const animate = () => {
      const time = clock.getElapsedTime();
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      tubeMesh.rotation.x = time * 0.08 + mouse.y * 0.25;
      tubeMesh.rotation.y = time * 0.12 + mouse.x * 0.35;
      tubeMesh.rotation.z = Math.sin(time * 0.1) * 0.15;

      wireMesh.rotation.copy(tubeMesh.rotation);

      // Move motes
      const pos = motesGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < motesCount; i++) {
        pos[i * 3] += motesVel[i].x;
        pos[i * 3 + 1] += motesVel[i].y;
        pos[i * 3 + 2] += motesVel[i].z;

        if (pos[i * 3 + 1] > 500) pos[i * 3 + 1] = -500;
        if (pos[i * 3] > 900) pos[i * 3] = -900;
        if (pos[i * 3] < -900) pos[i * 3] = 900;
      }
      motesGeo.attributes.position.needsUpdate = true;

      camera.position.x = mouse.x * 60;
      camera.position.y = mouse.y * 40;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize3d);
      renderer.dispose();
    };
  }, []);

  // Floating Dock Proximity Magnification
  const dockRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const items = Array.from(dock.querySelectorAll<HTMLElement>('[data-dock-item]'));

    const onPointerMove = (e: PointerEvent) => {
      const rect = dock.getBoundingClientRect();
      if (
        e.clientX < rect.left - 60 ||
        e.clientX > rect.right + 60 ||
        e.clientY < rect.top - 50 ||
        e.clientY > rect.bottom + 80
      ) {
        items.forEach((it) => {
          it.style.transform = 'scale(1)';
        });
        return;
      }

      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        const itemCenter = r.left + r.width / 2;
        const dist = Math.abs(e.clientX - itemCenter);
        const maxDist = 120;
        const scale = dist < maxDist ? 1 + (1 - dist / maxDist) * 0.28 : 1;
        it.style.transform = `scale(${scale}) translateY(${scale > 1 ? (1 - scale) * 8 : 0}px)`;
      });
    };

    const onPointerLeave = () => {
      items.forEach((it) => {
        it.style.transform = 'scale(1)';
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={heroRef} className="relative w-full min-h-screen bg-[#0d1211] text-[#E4DDD3] overflow-hidden select-none">
      {/* 3D Living Organic Canvas */}
      <canvas
        ref={canvas3dRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(0,161,155,0.22),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(228,221,211,0.06),transparent_60%)]" />

      {/* ── FLOATING DOCK NAVIGATION ─────────────────────────── */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav
          ref={dockRef}
          className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl border border-white/10 bg-[#121918]/85 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.12)] transition-all duration-300"
          aria-label="Main Navigation"
        >
          {/* Logo Pill */}
          <button
            onClick={() => scrollToSection('hero')}
            data-dock-item
            className="flex items-center justify-center px-3.5 h-10 rounded-xl bg-[#00A19B] text-black font-black text-xs uppercase tracking-widest transition-transform duration-150 cursor-pointer hover:bg-[#5eead4]"
          >
            ARIF
          </button>

          {/* Navigation Links */}
          {[
            { id: 's1', label: 'Ethos', glyph: '✦' },
            { id: 's2', label: 'Stats', glyph: '◈' },
            { id: 's3', label: 'About', glyph: '⌘' },
            { id: 'arsenal', label: 'Tech', glyph: '⚡' },
            { id: 'projects-section', label: 'Works', glyph: '📂' },
            { id: 'contact-section', label: 'Signal', glyph: '↗' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              data-dock-item
              className={`flex items-center gap-1.5 px-3 h-10 rounded-xl text-xs uppercase tracking-wider font-mono transition-all duration-150 cursor-pointer ${
                activeNav === item.id
                  ? 'bg-white/15 text-white shadow-inner font-semibold border border-white/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[#00A19B] text-xs">{item.glyph}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}

          {/* MagicUI Animated Theme Toggler */}
          <div data-dock-item className="pl-1 border-l border-white/10">
            <AnimatedThemeToggler
              variant="star"
              className="text-white/80 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10"
            />
          </div>
        </nav>
      </div>

      {/* ── MAIN STAGE CONTENT (Z 4) ─────────────────────────── */}
      <div ref={stageRef} className="relative z-10 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-between px-6 md:px-16 pt-28 md:pt-36 pb-12">
        {/* Top Meta Bar inspired by specia1ne */}
        <div className="flex items-center justify-between w-full text-xs font-mono tracking-widest text-white/60 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00A19B]/20 border border-[#00A19B]/40 text-[#5eead4] text-[10px] font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A19B] animate-ping" />
              01 / Signal
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/70 uppercase">Independent Digital Practice & Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Salem, India</span>
            </span>
            <span className="text-[#00A19B] font-bold font-mono">
              [ 2026 · Working Form ]
            </span>
          </div>
        </div>

        {/* Center Grid: Headline + Floating Cards + WebGL Liquid CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-10">
          {/* Left 7 Columns: Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="overflow-hidden mb-3">
              <p className="text-[#00A19B] font-mono text-xs md:text-sm tracking-[0.35em] uppercase flex items-center gap-2">
                <span>[ 01 ]</span>
                <span>T MOHAMMED ARIF // SHAPING WORKING SYSTEMS</span>
              </p>
            </div>

            <h1
              className="text-[clamp(3.2rem,8.5vw,110px)] font-black leading-[0.88] tracking-tight uppercase text-white mb-6"
              style={{
                fontFamily: '"Climate Crisis", sans-serif',
                fontVariationSettings: '"YEAR" 2024',
              }}
            >
              DIGITAL PRODUCTS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A19B] via-[#5eead4] to-[#E4DDD3]">
                INTERFACES &amp; CODE.
              </span>
            </h1>

            <p className="text-white/75 text-base md:text-xl font-light leading-relaxed max-w-xl mb-10">
              Shaping product logic, spatial direction, and full-stack technical execution — held in one continuous line from first concept to working form.
            </p>

            {/* CTA Group with WebGL2 Liquid Metal explore button & specia1ne signature brackets */}
            <div className="flex items-center gap-5 flex-wrap">
              {/* Liquid Metal Button Container */}
              <div
                ref={liquidStageRef}
                className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-1 shadow-2xl transition-transform active:scale-95"
              >
                <canvas
                  ref={liquidFxRef}
                  className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
                />
                <button
                  type="button"
                  onClick={() => scrollToSection('projects-section')}
                  className="liquid-button relative z-10 flex items-center gap-3.5 px-8 py-4 rounded-full bg-transparent text-white font-mono text-sm uppercase tracking-widest font-bold border border-white/20 hover:border-white/40 cursor-pointer transition-colors"
                >
                  <span className="text-[#00A19B]">[</span>
                  <span>Explore The Works</span>
                  <span className="text-[#00A19B]">]</span>
                  <svg className="w-4 h-4 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Secondary Action with bracket styling */}
              <button
                onClick={() => scrollToSection('contact-section')}
                className="px-6 py-4 rounded-full border border-white/20 hover:border-[#00A19B] text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/5 cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#00A19B]">[</span>
                <span>Let&apos;s talk</span>
                <span className="text-[#00A19B]">]</span>
                <span className="text-[#5eead4]">↗</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Sylva-Style Floating Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full">
            {/* Card 1: Ethos Glass Plate */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#00A19B]/40 hover:bg-white/[0.07]">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[#00A19B] font-mono text-xs tracking-widest uppercase">Ethos · 01</span>
                <span className="text-white/40 text-xs font-mono">2026</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: '"Bangers", sans-serif' }}>
                Let the Architecture Lead
              </h3>
              <p className="text-white/60 text-xs leading-relaxed font-sans mb-4">
                From scalable microservices to sub-millisecond shader pipelines — crafted with production rigor, commercial resilience, and aesthetic depth.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A19B]" />
                Next.js 16 · Three.js · Node.js · Cloud Architecture
              </div>
            </div>

            {/* Card 2: Field Note Signal */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#00A19B]/40 hover:bg-white/[0.07]">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[#00A19B] font-mono text-xs tracking-widest uppercase">Field Note · 02</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">● ACTIVE</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2" style={{ fontFamily: '"Bangers", sans-serif' }}>
                Zero-Downtime Hospital Systems
              </h3>
              <p className="text-white/60 text-xs leading-relaxed font-sans mb-4">
                Built and maintained critical live healthcare infrastructure at Valli Super Speciality Hospital, keeping patient operations continuous 24/7.
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 border-t border-white/10 pt-3">
                <span>Production Stack</span>
                <span className="text-[#5eead4]">100% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-white/70">
          <div>
            <div className="text-2xl md:text-3xl font-black text-white font-mono">15+</div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Shipped Projects</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-[#00A19B] font-mono">3+ Yrs</div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Industry Experience</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-white font-mono">5k+</div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Users Served</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-[#5eead4] font-mono">0.0ms</div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Downtime Tolerated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
