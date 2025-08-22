
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
