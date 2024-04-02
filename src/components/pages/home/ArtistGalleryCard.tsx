import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
type Props = {
    thumbnail: string;
    id_: string,
    sourceurl: string,
    date: Date
};

const ArtistGalleryCard = ({ thumbnail, id_, sourceurl, date }: Props) => {

    function extractDate(datetimeString: any) {
        var dateObject = new Date(datetimeString);
        var formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }

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
            <div className="d-flex flex-column">
                <span style={{ marginTop: 20 }}>Uploaded on {extractDate(date)}</span>
                <a style={{ textDecoration: 'underline' }} href={sourceurl}>Source Link</a>
            </div>
        </div>
    );
};

export default ArtistGalleryCard;
