import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

type Props = {
    dataMarker?: any
    center: any
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapsAdmin = ({ center, dataMarker }: Props) => {
    return (
        <MapContainer className={'h-[370px] rounded-md my-5 z-30'} center={center} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataMarker.map((marker: any, index: any) => (
                <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} >
                    <Popup>
                        <p>{marker.popupText}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapsAdmin