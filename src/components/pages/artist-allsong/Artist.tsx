'use client'
import api from "@/lib/api";
import { IconBrandFacebook, IconBrandFacebookFilled, IconBrandInstagram, IconBrandWikipedia, IconBrandYoutube, IconBrandYoutubeFilled, IconBrandTwitterFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Artist = () => {

  const [artist, setArtist] = useState(null)
  const [birthday, setBirthday] = useState('');
  const sq = useSearchParams();

  const getArtist = async () => {
    try {
      const res = await api.server.GET(`/data/artists/${sq.get('artist')}`, '');
      const data = await res.json()
      if (data.status) {
        setArtist(data.artist)
        return
      }
      toast(data.message, { theme: 'dark' })
    } catch (error: any) {
      toast(error.message, { theme: 'dark' })
    }
  }

  useEffect(() => {
    const getData = async () => {
      getArtist()
    }
    getData()
  }, [])

  useEffect(() => {
    const changeDateStyle = () => {
      const dateString = artist?.dob;
      const dateObject = new Date(dateString);
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setBirthday(formattedDate);
    }

    changeDateStyle();
  }, [artist])

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

  if (!artist) return
  return (
    // <!--genres section-->
    <section className="genres__section custom__space pr-24 pl-24 pb-60">
      <div className="container-fluid">
        <div className="artist__allhead d-flex">
          <Image
            width={390}
            height={390}
            style={{ borderRadius: '50%' }}
            src={`https://ersy.com/img/profile/${artist.img_}`}
            // src={`/img22/img/profile/${artist.img_}`}
            priority={true}
            alt=""
            className="flex-shrink-0 h-auto"
          />
          <div className="artist__allcontent">
            <h1 className="white mb-16 fw-500 d-block">{artist.name_}</h1>
            <span className="white fs-20 mb-10 ">Real name is {artist.alternate_name} was born in  {artist.birthplace} on   {birthday}</span>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>150 ON ERSY</th>
                    <th>170 ON SPOTIFY</th>
                    <th> {formatNumber(artist.views)} TOTAL VIEWS</th>
                    <th> {formatNumber(artist.ersy_views)} VIEWS ON ERSY</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="d-flex justify-content-start" style={{ padding: 30 }}>
              <button className="cmn__simple3">Follow Artist</button>
              <Link href={artist?.wikipedia} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandWikipedia /></span>
              </Link>
              <Link href={artist?.facebook} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandFacebookFilled style={{ color: 'blue' }} /></span>
              </Link>

              <Link href={artist?.instagram} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandInstagram /></span>
              </Link>

              <Link href={artist?.youtube} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandYoutubeFilled style={{ color: 'red' }} /></span>
              </Link>

              <Link href={artist?.youtube} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandTwitterFilled /></span>
              </Link>

              <Link href={artist?.youtube} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><img src='./img22/img/social-icon__soundcloud.svg' alt="Logo" width="30" height="30" ></img></span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Artist;
