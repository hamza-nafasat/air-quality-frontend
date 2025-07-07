// // // // RingMeter.jsx
// // // // import clsx from 'clsx'; // optional, just for cleaner class strings

// // // // function getRingColors(value) {
// // // //   switch (true) {
// // // //     // ───────── thresholds ─────────
// // // //     case value >= 100:
// // // //       return ['bg-red-900', 'bg-red-900', 'bg-red-900', 'bg-red-900'];

// // // //     case value >= 80:
// // // //       return ['bg-red-900', 'bg-red-900', 'bg-red-900', 'bg-yellow-900'];

// // // //     case value >= 60:
// // // //       return ['bg-red-900', 'bg-red-900', 'bg-yellow-900', 'bg-green-900'];

// // // //     case value >= 50:
// // // //       return ['bg-red-900', 'bg-yellow-900', 'bg-green-900', 'bg-green-900'];

// // // //     case value >= 40:
// // // //       return ['bg-yellow-900', 'bg-yellow-900', 'bg-green-900', 'bg-green-900'];

// // // //     default: // < 35
// // // //       return ['bg-green-900', 'bg-green-900', 'bg-green-900', 'bg-green-900'];
// // // //   }
// // // // }

// // // // export default function RingMeter({ value = 0 }) {
// // // //   // inner‑to‑outer order: ring1 (index 0) → ring4 (index 3)
// // // //   const [ring1, ring2, ring3, ring4] = getRingColors(value);

// // // //   return (
// // // //     <div className="flex items-center justify-center">
// // // //       <div
// // // //         id="ring4"
// // // //         className={clsx('size-8 flex items-center justify-center rounded-full', ring4)}
// // // //       >
// // // //         <div
// // // //           id="ring3"
// // // //           className={clsx('size-6 flex items-center justify-center rounded-full', ring3)}
// // // //         >
// // // //           <div
// // // //             id="ring2"
// // // //             className={clsx('size-4 flex items-center justify-center rounded-full', ring2)}
// // // //           >
// // // //             <div id="ring1" className={clsx('size-4 rounded-full', ring1)} />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // /* RingMeter.jsx ---------------------------------------------------------- */
// // import React from 'react';

// // /* Tailwind colour utilities in one place so you can tweak later */
// // const RED = 'bg-red-900';
// // const YEL = 'bg-yellow-900';
// // const GREEN = 'bg-green-900';

// // /**
// //  * Return an array of four bg‑color classes (inner → outer)
// //  * according to the score rules you listed.
// //  */
// // function getRingColors(value) {
// //   // Clamp weird inputs to the 0‑100 range
// //   const v = Math.max(0, Math.min(value, 100));

// //   switch (true) {
// //     case v >= 100: // 100 or more → all red
// //       return [RED, RED, RED, RED];

// //     case v >= 80: // 80‑99
// //       return [RED, RED, RED, YEL];

// //     case v >= 60: // 60‑79
// //       return [RED, RED, YEL, GREEN];

// //     case v >= 50: // 50‑59
// //       return [RED, YEL, GREEN, GREEN];

// //     case v >= 40: // 40‑49
// //       return [YEL, YEL, GREEN, GREEN];

// //     default: // < 40  (incl. < 35 ⇒ all green)
// //       return [GREEN, GREEN, GREEN, GREEN];
// //   }
// // }

// // export default function RingMeter({ value, className = '' }) {
// //   const [ring1, ring2, ring3, ring4] = getRingColors(value);

// //   return (
// //     <div className={`flex items-center justify-center ${className}`}>
// //       <div id="ring4" className={`size-8 flex items-center justify-center rounded-full ${ring4}`}>
// //         <div id="ring3" className={`size-6 flex items-center justify-center rounded-full ${ring3}`}>
// //           <div
// //             id="ring2"
// //             className={`size-4 flex items-center justify-center rounded-full ${ring2}`}
// //           >
// //             <div id="ring1" className={`size-4 rounded-full ${ring1}`} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// /* RingMeter.jsx – JS version with corrected sizes */

// // import React from 'react';

// // const RED = 'bg-red-500';
// // const YEL = 'bg-yellow-500'; // change to bg-yellow-500 if you want a brighter shade
// // const GREEN = 'bg-green-500';

// // function getRingColors(value) {
// //   const v = Math.max(0, Math.min(value, 100));

// //   switch (true) {
// //     case v >= 100:
// //       return [RED, RED, RED, RED]; // 100
// //     case v >= 80:
// //       return [RED, RED, RED, YEL]; // 80‑99
// //     case v >= 60:
// //       return [RED, RED, YEL, GREEN]; // 60‑79
// //     case v >= 50:
// //       return [RED, YEL, GREEN, GREEN]; // 50‑59
// //     case v >= 40:
// //       return [YEL, YEL, GREEN, GREEN]; // 40‑49
// //     default:
// //       return [GREEN, GREEN, GREEN, GREEN]; // < 40
// //   }
// // }

// // export default function RingMeter({ value, className = '' }) {
// //   const [ring1, ring2, ring3, ring4] = getRingColors(value);

// //   return (
// //     <div className={`flex items-center justify-center ${className}`}>
// //       <div className={`size-8 flex items-center justify-center rounded-full ${ring4}`} id="ring4">
// //         <div className={`size-6 flex items-center justify-center rounded-full ${ring3}`} id="ring3">
// //           <div
// //             className={`size-4 flex items-center justify-center rounded-full ${ring2}`}
// //             id="ring2"
// //           >
// //             {/* ↓ smaller so ring 2 isn't hidden ↓ */}
// //             <div className={`size-2 rounded-full ${ring1}`} id="ring1" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// /* HeatRingMeter.jsx ------------------------------------------------------ */
// import React from 'react';

// /**
//  * Convert a 0 → 100 score to a heat‑map colour:
//  *   0   ⇒ green   (cool)      hue 120°
//  *   50  ⇒ yellow  (warm)      hue  60°
//  *   100 ⇒ red     (hot)       hue   0°
//  */
// function heatColour(score) {
//   const v = Math.max(0, Math.min(score, 100)); // clamp
//   const hue = (1 - v / 100) * 120; // 120 → 0
//   return `hsl(${hue}deg 100% 50%)`; // full‑sat, mid‑light
// }

// /**
//  * Each successive ring shows the score minus 25, minus 50, minus 75 … so you
//  * get a smooth gradient from the centre outwards.
//  */
// export default function HeatRingMeter({ value = 0, className = '' }) {
//   const ring1 = heatColour(value); // inner — hottest
//   const ring2 = heatColour(value - 25);
//   const ring3 = heatColour(value - 50);
//   const ring4 = heatColour(value - 75); // outer — coolest

//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       {/* outer ring */}
//       <div
//         id="ring4"
//         className="size-8 flex items-center justify-center rounded-full"
//         style={{ backgroundColor: ring4 }}
//       >
//         {/* ring 3 */}
//         <div
//           id="ring3"
//           className="size-6 flex items-center justify-center rounded-full"
//           style={{ backgroundColor: ring3 }}
//         >
//           {/* ring 2 */}
//           <div
//             id="ring2"
//             className="size-4 flex items-center justify-center rounded-full"
//             style={{ backgroundColor: ring2 }}
//           >
//             {/* ring 1 (centre) — smaller so ring 2 stays visible */}
//             <div id="ring1" className="size-2 rounded-full" style={{ backgroundColor: ring1 }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// RingMeter.jsx
import React from 'react';

// Heat-style gradient colors
const COLD = 'bg-green-400'; // coolest (low value)
const COOL = 'bg-lime-400';
const WARM = 'bg-yellow-400';
const HOT = 'bg-orange-500';
const BURN = 'bg-red-600'; // hottest

function getRingColors(value) {
  const v = Math.max(0, Math.min(value, 100));

  switch (true) {
    case v >= 60:
      return [BURN, BURN, BURN, BURN]; // all hot
    case v >= 50:
      return [BURN, BURN, BURN, HOT];
    case v >= 30:
      return [BURN, BURN, HOT, WARM];
    case v >= 20:
      return [BURN, HOT, WARM, COOL];
    case v >= 10:
      return [HOT, WARM, COOL, COLD];
    default:
      return [COOL, COOL, COLD, COLD]; // coolest
  }
}

export default function RingMeter({ value, className = '' }) {
  const [ring1, ring2, ring3, ring4] = getRingColors(value);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`size-8 flex items-center justify-center rounded-full ${ring4}`} id="ring4">
        <div className={`size-6 flex items-center justify-center rounded-full ${ring3}`} id="ring3">
          <div
            className={`size-4 flex items-center justify-center rounded-full ${ring2}`}
            id="ring2"
          >
            <div className={`size-2 rounded-full ${ring1}`} id="ring1" />
          </div>
        </div>
      </div>
    </div>
  );
}
