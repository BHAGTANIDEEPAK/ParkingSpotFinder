// src/leaflet-control-geocoder.d.ts

import { Control as LeafletControl } from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    function geocoder(options?: any): LeafletControl;
  }
}

export {};
