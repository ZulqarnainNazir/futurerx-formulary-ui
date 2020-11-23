import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './Marker';
import "./GoogleMap.scss";


interface GoogleMapProps {
    // children: React.ReactNode;
    // defaultCenter: any;
    coordinates?: any,
    defaultZoom: number;
    preffered?: any;
    // classes: Partial<Record<DialogClassKey, string>>;
    // onGoogleApiLoaded: (map: string, maps: string) => void;
}

const latLngs = [
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964214, lng: -82.452453 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964157, lng: - 82.452606 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964034, lng: - 82.452467 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.963709, lng: - 82.451898 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964705, lng: -82.452576 }, pharmacy: 'Best Drug Store', index: ''
    }
]
class GoogleMap extends Component<GoogleMapProps> {

    state = {
        defaultCenter:
            { lat: 27.964157, lng: -82.452606 },

        location:
            { lat: 27.904157, lng: -82.452658 },

        // location:{},

    }


    async componentWillReceiveProps(nextprops) {
        await this.setState({ location: nextprops.defaultCenter })
    }



    renderMarkers = (map: any, maps: any) => {
        // let marker1 = new maps.Marker({
        //     position: { lat: 27.964157, lng: - 82.452606 },
        //     title: 'Acme Rx',
        //     map,
        // })
        // let marker2 = new maps.Marker({
        //     position: { lat: 27.964034, lng: - 82.452467 },
        //     title: 'Best Drugs Store',
        //     map,
        // })
        // let marker3 = new maps.Marker({
        //     position: { lat: 27.963709, lng: - 82.451898 },
        //     title: 'Care Pharm',
        //     map,
        // })
        // let marker4 = new maps.Marker({
        //     position: { lat: 27.964705, lng: -82.452576 },
        //     title: 'Wal Mart',
        //     map,
        // })
        // let marker5 = new maps.Marker({
        //     position: { lat: 27.964214, lng: -82.452453 },
        //     title: 'Publix',
        //     map,
        // })
        // return [marker1,
        //     marker2,
        //     marker3,
        //     marker4
        //     // marker5
        // ]
    };


    render() {
        const {
            // defaultCenter,
            defaultZoom,
            // onGoogleApiLoaded
            coordinates,
            preffered
        } = this.props;

        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCYUqZqsAx14PqEFhy4O1YYGc-HEXe9YzI" }}
                defaultCenter={
                    this.state.defaultCenter
                }
                defaultZoom={18}
                defaultOptions={{ 'fullscreenControl': false, 'zoomControlOptions': false }}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            >
                {(coordinates || latLngs).map((item: any) => (<MyGreatPlace lat={item.coordinates.lat} lng={item.coordinates.lng} text={item.pharmacy} data={{ pharmacy: item.pharmacy, address: item.address, phone: item.phone, time: item.workingHours.filter((_item: any) => _item.day === new Date().toString().substr(0, 3))[0].time }} isPreffered={preffered ? preffered.includes(item.pharmacy) : false} />))}
            </GoogleMapReact>
        );
    }
}

export default GoogleMap;
