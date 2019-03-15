import './MapAppRoot.css';
import * as React from 'react';
import { Polygon } from 'react-leaflet';
import { DefaultMap } from '../maps/DefaultMap';
import { fetchCity, OSMPlace, OSMPlacePlus } from '../../tools/fetchCity';
import { PieChart, Legend, Pie, Cell } from 'recharts';
//import { scaleOrdinal } from 'd3-scale';
//import { schemeCategory10 } from 'd3-scale-chromatic';
import { generate_PIE_DATA } from '../../dataMocks/data';
import { ICoordinates } from '../maps/ICoordinates';
import {
    getCoordinates,
    countCenterOfGeoJson,
} from '../../tools/countCenterOfGeoJson';
import { CITIES_CZECHIA } from '../../dataMocks/cities';
//const colors = scaleOrdinal(schemeCategory10).range();

interface MapAppRootProps {}

interface MapAppRootState {
    places: OSMPlacePlus[];
    city: null | OSMPlacePlus;
    center: ICoordinates;
}

export class MapAppRoot extends React.Component<
    MapAppRootProps,
    MapAppRootState
> {
    state: MapAppRootState = {
        places: [],
        city: null,
        center: { lat: 50, lng: 14.4 },
    };

    constructor(props: MapAppRootProps) {
        super(props);

        for (const city of CITIES_CZECHIA) {
            this.loadCity(city);
        }

        //Not working:
        //this.loadCity('Nürnberg');
        //this.loadCity('Berlin');
        //this.loadCity('Paris'); - only one district
        //this.loadCity('Bratislava');
        //this.loadCity('Wien');
        //this.loadCity('London');
    }

    async loadCity(cityName: string) {
        console.log(`Loading ${cityName}...`);
        const city = await fetchCity(cityName);
        this.setState({ places: [...this.state.places, city] });
    }

    async centerByGPS() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                center: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        });
    }

    async changeCity(city: OSMPlacePlus) {
        this.setState({
            center: countCenterOfGeoJson(city.geojson),
            city,
        });
    }

    render() {
        return (
            <div className="MapAppRoot">
                {/* <div
                    className=""
                    style={{
                        background: `url("https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fwww.timeout.com%2Fwp-content%2Fuploads%2F2014%2F08%2FCharles_Bridge_courtyardpixShutterstock.com_.jpg&u=https://www.timeout.com/wp-content/uploads/2014/08/Charles_Bridge_courtyardpixShutterstock.com_.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom center',
                    }}
                >
                    Prague
                </div> */}

                <nav className="app-name">Hot🔥Net</nav>

                <button className="center" onClick={() => this.centerByGPS()}>
                    GPS
                </button>

                {this.state.city && (
                    <>
                        <div className="avatar">
                            <div
                                className="inner"
                                style={{
                                    background: `url("${
                                        this.state.city.image
                                    }")`,
                                    //backgroundSize: 'cover',
                                    //backgroundPosition: 'bottom center',
                                }}
                            >
                                <h1>
                                    {this.state.city.display_name.split(',')[0]}
                                </h1>
                            </div>
                        </div>
                        <div className="chart">
                            <PieChart width={190} height={190}>
                                {/* <Legend /> */}
                                <Pie
                                    data={generate_PIE_DATA(
                                        this.state.city.display_name.split(
                                            ',',
                                        )[0],
                                    )}
                                    dataKey="value"
                                    cx={90}
                                    cy={90}
                                    startAngle={360}
                                    endAngle={0}
                                    innerRadius={1}
                                    outerRadius={90}
                                >
                                    {generate_PIE_DATA(
                                        this.state.city.display_name.split(
                                            ',',
                                        )[0],
                                    ).map((entry, index) => (
                                        <Cell
                                            key={`slice-${index}`}
                                            fill={entry.color}
                                            stroke={'transparent'}
                                        />
                                    ))}
                                    {/*<Label value="test" position="outside" />
                            {/*<LabelList position="outside" />*/}
                                </Pie>
                            </PieChart>
                        </div>
                    </>
                )}

                <div
                    className="city"
                    style={{
                        //background: `url("https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fwww.timeout.com%2Fwp-content%2Fuploads%2F2014%2F08%2FCharles_Bridge_courtyardpixShutterstock.com_.jpg&u=https://www.timeout.com/wp-content/uploads/2014/08/Charles_Bridge_courtyardpixShutterstock.com_.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom center',
                    }}
                >
                    <h1>Prague</h1>
                </div>

                <div className="map">
                    {this.state.center && (
                        <DefaultMap center={this.state.center} zoom={9}>
                            {/* {markers.map((position, key) => (
                            <Marker {...{ position, key }} />
                        ))} */}

                            {this.state.places.map((place) => (
                                <Polygon
                                    key={place.place_id}
                                    positions={place.geojson.coordinates[0].map(
                                        getCoordinates,
                                    )}
                                    onclick={() => {
                                        this.changeCity(place);
                                    }}
                                    stroke={true}
                                    color={
                                        place === this.state.city
                                            ? '#1166cc'
                                            : '#777'
                                    }

                                    // stroke?: boolean;
                                    // color?: string;
                                    // weight?: number;
                                    // opacity?: number;
                                    // lineCap?: LineCapShape;
                                    // lineJoin?: LineJoinShape;
                                    // dashArray?: string;
                                    // dashOffset?: string;
                                    // fill?: boolean;
                                    // fillColor?: string;
                                    // fillOpacity?: number;
                                    // fillRule?: FillRule;
                                    // renderer?: Renderer;
                                    // className?: string;
                                />
                            ))}
                        </DefaultMap>
                    )}
                </div>
            </div>
        );
    }
}
