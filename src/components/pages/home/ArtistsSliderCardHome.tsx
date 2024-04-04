import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  img_: StaticImageData;
  name_: string;
  id_: string,
  views: number,
  monthly_listeners: number,
  facebook_count: number,
  youtube_count: number,
  twitter_count: number,
  spotify_count: number,
  soundcloud_count: number,
  instagram_count: number,
  gallery_count: number
};

const ArtistsSliderCardHome = ({ img_, name_, id_, views, monthly_listeners, facebook_count, youtube_count, twitter_count, spotify_count, soundcloud_count, instagram_count, gallery_count }: Props) => {

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  return (
    <div className="swiper-slide trending__item round30 p-8">
      <div className="thumb ralt overhid transition">
        <Link href={`/artist-allsong?artist=${id_}`} className="white">
          <Image
            src={`https://ersy.com/img/profile/${img_}`}
            width={300}
            height={300}
            style={{ borderRadius: '30%', justifyContent: 'center' }}
            className="transition h-auto"
            alt="img"
            priority={true}
          />
        </Link>
        <div className="align-items-center justify-content-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
          <span style={{ textAlign: 'center', marginTop: 10 }}>
            {name_}
          </span>  
        </div>
      </div>
    </div>
  );
};

export default ArtistsSliderCardHome;
