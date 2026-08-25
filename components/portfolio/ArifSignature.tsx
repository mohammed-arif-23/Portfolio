import styles from './ArifSignature.module.css';

export interface ArifSignatureProps {
  className?: string;
}

export default function ArifSignature({ className }: ArifSignatureProps) {
  const signatureClassName = className
    ? `${styles.signature} ${className}`
    : styles.signature;

  return (
    <svg
      className={signatureClassName}
      viewBox="0 0 450 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={`${styles.stroke} ${styles.initial}`}
        pathLength={1}
        d="M18 134C42 120 58 91 72 50C78 32 89 20 99 25C112 31 108 54 101 75C94 97 87 119 93 133C98 144 110 139 120 119C135 91 143 57 144 31C145 65 146 102 166 126M58 91C82 84 111 81 146 83"
      />
      <path
        className={`${styles.stroke} ${styles.letterR}`}
        pathLength={1}
        d="M157 126C167 112 173 93 175 76C176 94 174 114 180 124C185 133 191 116 196 104C201 92 206 86 212 88C220 91 220 100 214 104C208 108 201 105 198 101C203 114 211 124 221 126"
      />
      <path
        className={`${styles.stroke} ${styles.letterI}`}
        pathLength={1}
        d="M218 126C230 129 239 116 245 99C250 85 254 76 257 72C256 89 251 112 256 122C261 132 272 121 280 106M254 55C257 52 262 52 265 55"
      />
      <path
        className={`${styles.stroke} ${styles.finisher}`}
        pathLength={1}
        d="M277 109C287 92 292 62 295 39C298 18 306 11 313 20C321 31 316 51 305 68C293 87 290 105 299 119C311 136 333 128 347 109M276 79C299 74 326 75 349 80M299 122C326 134 356 130 382 116C397 108 411 109 420 117"
      />
    </svg>
  );
}
