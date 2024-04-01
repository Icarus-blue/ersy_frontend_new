import { songUpgradeData } from "@/../public/data/songUpgrdeData";
import SongUpgrade from "@/components/pages/album-allsong/SongUpgrade";
import ArtistsVideo from "@/components/pages/album-allsong/ArtistsVideo";
import Artist from "@/components/pages/artist-allsong/Artist";
import MainBody from "@/components/shared/MainBody";
import { store } from "@/redux/store";
import { fetchData } from "@/utils/fetchData";
import { Metadata } from "next";
import { Provider } from "react-redux";

export const metadata: Metadata = {
  title:
    "Artist All Song - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const artistAllSong = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <>
      <Artist />
      <ArtistsVideo
        artist={searchParams?.artist}
        sectionTitle="Most Popular" />
    </>
  );
};

export default artistAllSong;
