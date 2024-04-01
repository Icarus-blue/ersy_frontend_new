import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
    thumbnail: string;
    id_: string,
    sourceurl: string,

};

const ArtistGalleryCard = ({ thumbnail, id_, sourceurl }: Props) => {

    return (
        <div className="swiper-slide trending__item round30 p-8">
            <div className="thumb ralt overhid transition">
                <img
                    src={`https://ersy.com/${thumbnail}`}
                    className="transition "
                    alt="img"
                    style={{
                        objectFit: 'cover',
                        height: '300px',
                        width: '100%'
                    }}
                />
            </div>
        </div>
    );
};

export default ArtistGalleryCard;
