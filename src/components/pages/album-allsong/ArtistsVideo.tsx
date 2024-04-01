'use client'
import { StaticImageData } from "next/image";
import SongUpgradeTableRow from "./SongUpgradeTableRow";
import VideoCard from "../home/VideoCard";
import ArtistGalleryCard from "../home/ArtistGalleryCard";
import AlbumCard from "../home/AlbumCard";
import ShortMusicVideo from "@/components/shared/ShortMusicVideo";
import Colloborate from '../home/Colloborate'
import { fetchData } from "@/utils/fetchData";
import { useState, useEffect } from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import SelectBoxNew from "@/components/shared/SelectBoxNew";
import Link from "next/link";

type Props = {
    sectionTitle: string;
    artist: string
};

const sortMode = [
    { label: "Most Views" },
    { label: "Recent First" },
    { label: "Old First" },
];

const ArtistsVideo = ({ sectionTitle, artist }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [allsongs, setAllSongs] = useState(null)
    const [musicVidoes, setMusicVidoes] = useState(null)
    const [interviews, setInterviews] = useState(null)
    const [gallery, setGallery] = useState(null)
    const [colloborates, setColloborates] = useState(null)
    const [albums, setAlbums] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [queryobj, setQueryObj] = useState({
        genre: 'All Songs',
        sortMode: 'Most Views',
    });

    const handleSearch = () => {

    }

    const handleSortChange = (newSortMode: { label: string }) => {
        console.log(newSortMode);
        setQueryObj(prevState => ({
            ...prevState,
            sortMode: newSortMode.label,
        }));
    };

    useEffect(() => {
        const getAllSongs = async () => {
            try {
                const data = await fetchData('/data/getallsongs', 1, 12, artist)
                setAllSongs(data.videos)
            } catch (error) {
                console.log(error);
            }
        }
        getAllSongs()
    }, [])

    useEffect(() => {
        const getMusicVideos = async () => {
            try {
                const data = await fetchData('/data/musicvideos', 1, 12, artist)
                setMusicVidoes(data.videos)
            } catch (error) {
                console.log(error);
            }
        }
        getMusicVideos()
    }, [])

    useEffect(() => {
        const getAlbums = async () => {
            try {
                const data = await fetchData('/data/albums', 1, 12, artist)
                setAlbums(data.albums)
            } catch (error) {
                console.log(error);
            }
        }
        getAlbums()
    }, [])

    useEffect(() => {
        const getInterviews = async () => {
            try {
                const data = await fetchData('/data/interviews', 1, 12, artist)
                setInterviews(data.videos)
            } catch (error) {
                console.log(error);
            }
        }
        getInterviews()
    }, [])

    useEffect(() => {
        const getGallery = async () => {
            try {
                const data = await fetchData('/data/gallery_artist', 1, 12, artist)
                console.log(data.gallerys);
                setGallery(data.gallerys)
            } catch (error) {
                console.log(error);
            }
        }
        getGallery()
    }, [])

    useEffect(() => {
        const getColloberators = async () => {
            try {
                const data = await fetchData('/data/colloborates', 1, 12, artist)
                setColloborates(data.colloborates)
            } catch (error) {
                console.log(error);
            }
        }
        getColloberators()
    }, [])

    return (

        <section className="trending__section pr-24 pl-24 pb-100">
            <div className="trending__selected mb-30 d-flex align-items-center justify-content-center justify-content-lg-between">
                <div className="select__lefts d-flex align-items-center">
                    <form
                        onSubmit={handleSearch}
                        className="d-flex align-items-center justify-content-between"
                    >
                        <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search..." />
                        <button type="submit" aria-label="submit button">
                            <IconSearch />
                        </button>
                    </form>
                    <SelectBoxNew
                        options={sortMode}
                        value={queryobj.sortMode}
                        onChange={(newValue) => handleSortChange(newValue)} // Handle changes
                    />
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {allsongs && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#home-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="home-tab-pane"
                                    aria-selected="true"
                                    aria-label="home-tab"
                                >
                                    ALL SONGS
                                </button>
                            </li>
                        </>)
                    }
                    {musicVidoes && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile-tab-pane"
                                    aria-selected="false"
                                    aria-label="profile-tab"
                                >
                                    MUSIC VIDEOS
                                </button>
                            </li>
                        </>
                    )}
                    {albums && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#album-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="album-tab-pane"
                                    aria-selected="false"
                                    aria-label="profile-tab"
                                >
                                    ALBUMS
                                </button>
                            </li>
                        </>
                    )}
                    {interviews && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    aria-label="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact-tab-pane"
                                    aria-selected="false"
                                >
                                    INTERVEIWS
                                </button>
                            </li>
                        </>
                    )}
                    {gallery && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link "
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#pop-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="pop-tab-pane"
                                    aria-selected="true"
                                    aria-label="home-tab"
                                >
                                    GALLERY
                                </button>
                            </li>
                        </>
                    )}
                    {colloborates && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#reggae-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="reggae-tab-pane"
                                    aria-selected="false"
                                    aria-label="profile-tab"
                                >
                                    COLLABORATIONS
                                </button>
                            </li>
                        </>
                    )}
                    {twitter && (
                        <>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    aria-label="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#jazz-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="jazz-tab-pane"
                                    aria-selected="false"
                                >
                                    TWITTER
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="container-fluid">
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="home-tab-pane"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <div className="row g-4">
                            {allsongs && (
                                <>
                                    {allsongs.map(({ id, ...props }: any) => (
                                        <div
                                            key={id}
                                            className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                        >
                                            <VideoCard key={id} {...props} link="album-allsong" />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="text-center mt-60 " >
                            <Link href="#" onClick={async (e) => {
                                e.preventDefault()
                                setIsLoading(true)
                                const data = await fetchData('/data/videos', allsongs.length <= 12 ? 2 : allsongs.length / 12 + 1, 12, artist)
                                setAllSongs((prev: any) => ([...prev, ...data.videos]))
                                setIsLoading(false)
                            }} className="cmn__simple2" >
                                {isLoading ? 'loading...' : 'Load More'}
                            </Link>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="profile-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <div className="row g-4">
                            <div className="row g-4">
                                {musicVidoes && (
                                    <>
                                        {musicVidoes.map(({ id, ...props }: any) => (
                                            <div
                                                key={id}
                                                className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                            >
                                                <VideoCard key={id} {...props} link="album-allsong" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="text-center mt-60 " >
                                <Link href="#" onClick={async (e) => {
                                    e.preventDefault()
                                    setIsLoading(true)
                                    const data = await fetchData('/data/videos', musicVidoes.length <= 12 ? 2 : musicVidoes.length / 12 + 1, 12, artist)
                                    setMusicVidoes((prev: any) => ([...prev, ...data.videos]))
                                    setIsLoading(false)
                                }} className="cmn__simple2" >
                                    {isLoading ? 'loading...' : 'Load More'}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="album-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <div className="row g-4">
                            <div className="row g-4">
                                {albums && (
                                    <>
                                        {albums.map(({ id, ...props }: any) => (
                                            <div
                                                key={id}
                                                className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                            >
                                                <AlbumCard key={id} {...props} link="album-allsong" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="contact-tab-pane"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                    >
                        <div className="row g-4">
                            <div className="row g-4">
                                {interviews && (
                                    <>
                                        {interviews.map(({ id, ...props }: any) => (
                                            <div
                                                key={id}
                                                className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                                            >
                                                <VideoCard key={id} {...props} link="album-allsong" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="text-center mt-60 " >
                                <Link href="#" onClick={async (e) => {
                                    e.preventDefault()
                                    setIsLoading(true)
                                    const data = await fetchData('/data/interviews', interviews.length <= 12 ? 2 : interviews.length / 12 + 1, 12, artist)
                                    setInterviews((prev: any) => ([...prev, ...data.videos]))
                                    setIsLoading(false)
                                }} className="cmn__simple2" >
                                    {isLoading ? 'loading...' : 'Load More'}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pop-tab-pane"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                    >
                        <div className="row g-4">
                            {gallery && (
                                <>
                                    {gallery.map((props: any) => (
                                        <div
                                            key={props.id_}
                                            className="col-xxl-2 col-xl-2 col-lg-3 col-md-6 col-sm-3"
                                        >
                                            <ArtistGalleryCard thumbnail={props.thumbnail_url} id_={props.id_} sourceurl={props.url} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="text-center mt-60 " >
                            <Link href="#" onClick={async (e) => {
                                e.preventDefault()
                                setIsLoading(true)
                                const data = await fetchData('/data/gallery_artist', gallery.length <= 12 ? 2 : gallery.length / 12 + 1, 12, artist)
                                setGallery((prev: any) => ([...prev, ...data.gallerys]))
                                setIsLoading(false)
                            }} className="cmn__simple2" >
                                {isLoading ? 'loading...' : 'Load More'}
                            </Link>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="reggae-tab-pane"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                    >
                        <div className="row g-4">
                            {colloborates && (
                                <>
                                    {colloborates.map((props: any) => (
                                        <div
                                            key={props.id_}
                                            className="col-xxl-2 col-xl-2 col-lg-3 col-md-6 col-sm-3"
                                        >
                                            <Colloborate id_={props} />
                                        </div>
                                    ))}
                                </>)}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtistsVideo;
