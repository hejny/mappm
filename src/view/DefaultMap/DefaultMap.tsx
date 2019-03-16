import './DefaultMap.css';
import * as React from 'react';
import { Map, TileLayer, MapLayer } from 'react-leaflet';
import { LatLngLiteral, Layer } from 'leaflet';

export type Viewport = { center: LatLngLiteral; zoom: number };
export type ViewportChangeHandler = (viewport: Viewport) => void;

export interface IDefaultMapProps {
    center?: LatLngLiteral;
    zoom?: number;
    onViewportChange?: ViewportChangeHandler;
    className?: string;
}

export const DefaultMap: React.SFC<IDefaultMapProps> = ({
    children,
    center,
    zoom,
    onViewportChange,
    className,
}) => (
    <div className="DefaultMap">
        <Map
            scrollWheelZoom
            touchZoom
            zoomControl={false}
            zoom={zoom || 11}
            center={center || [48.7775, 11.43111]}
            onViewportChange={viewportChangeHandler(onViewportChange)}
            onClick={(e)=>{
                console.log('aa',e);
            }}
        >
            <TileLayer
                url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {children}
        </Map>
    </div>
);

function viewportChangeHandler(
    onViewportChange: ViewportChangeHandler = () => {},
) {
    return ({ center, zoom }: any) => {
        const [lat, lng] = center;
        onViewportChange({
            center: { lat, lng },
            zoom,
        });
    };
}
