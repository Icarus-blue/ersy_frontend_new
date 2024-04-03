import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/fetchData";
type Props = {
    id_: string
};

const Colloborate = ({ id_ }: Props) => {
    const [artist, setArtist] = useState(null)

    useEffect(() => {
        const getArtistes = async () => {
            try {
                const data = await fetchData('/data/getArtist', 1, 12, id_)
                setArtist(data.artist)
            } catch (error) {

            }
        }
        getArtistes()
    }, [])

    return (
        <div className="swiper-slide trending__item round30 p-8">
            <div className="thumb ralt overhid transition">
                <a href={`/artist-allsong?artist=${artist?.id_}`} className="white">
                    <img
                        src={`https://ersy.com/img/profile/${artist?.img_}`}
                        // src={`./img22/img/profile/${artist?.img_}`}
                        className="transition "
                        alt="img"
                        style={{
                            objectFit: 'cover',
                            height: '300px',
                            width: '100%'
                        }}
                    />
                    <text style={{color:'black'}}>{artist?.name_}</text>
                </a>
            </div>
        </div>
    );
};

export default Colloborate;
