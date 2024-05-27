'use client'
import { useState, useEffect } from "react";
import "./sectionone.css"
import Link from "next/link";

import Cookies from 'js-cookie';
import { TokenDecoded } from '@/app/scripts/UserCookieDecoded';

export default function SectionOne() {

    const [positions, setPositions] = useState(['']);

    const GetPositionFromUser = async () => {
        const token: string | any = Cookies.get('token');
        let user = await TokenDecoded(token);
        if (user) {
            setPositions(user.positions);
        }
        if (user?.positions[0] === 'admin') {
            let result: [{ num: number, name: string }] = await FetchPosition(process.env.API_ROUTE + '/position/getall');
            let array: Array<string> = [];
            if (result) {
                result.map((value) => {
                    array.push(value.name);
                })
            }
            setPositions(array);
        }
    }

    async function FetchPosition(url: string) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        const data = await res.json();

        if (data) return data.positions;
        return null;
    }

    useEffect(() => {
        GetPositionFromUser();
    }, []);



    return (
        <div className="sectionone-container flex jcenter wrap acenter dirrow">
            {/* <p> Categories </p> */}
            <>
                {
                    positions.map((value, key) => {
                        if (value !== 'admin') {
                            return (
                                value !== '' ? <Link key={key} className="sectionone-filestab-container flex jcenter acenter" href={`/pages/Files/Category/${value} `}> {value} </Link> : ''
                            );
                        }
                    })
                }
            </>

            {/* <Link className="sectionone-filestab-container flex jcenter acenter" href="/pages/MemberManager"> Member </Link> */}


        </div>
    );
}