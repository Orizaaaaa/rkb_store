
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


type Props = {
    markerPosition: { lat: number, lng: number },
    zoom: number
    text: string
    children?: React.ReactNode
    className?: string
}

const Maps = ({ markerPosition, zoom, text, children, className }: Props) => {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer className={`${className} z-30`} center={{ lat: -6.917464, lng: 107.619125 }} zoom={zoom} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {children}
            <Marker position={markerPosition} >
                <Popup>
                    {text}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Maps