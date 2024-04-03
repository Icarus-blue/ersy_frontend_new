'use client'
import { StaticImageData } from "next/image";
import SongUpgradeTableRow from "./SongUpgradeTableRow";
import VideoCard from "../home/VideoCard";
import ArtistGalleryCard from "../home/ArtistGalleryCard";
import AlbumCard from "../home/AlbumCard";
import ShortMusicVideo from "@/components/shared/ShortMusicVideo";
import Colloborate from '../home/Colloborate'
import { fetchData } from "@/utils/fetchData";
import { useState, useEffect, ChangeEvent } from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import SelectBoxNew from "@/components/shared/SelectBoxNew";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/shared/Loader";

type Props = {
    sectionTitle: string;
    artist: string
};

const sortMode = [
    { label: "Most Views" },
    { label: "Recent First" },
    { label: "Older First" },
];

const gallerySortMode = [
    { label: "Recent First" },
    { label: "Older First" },
];

const ArtistsVideo = ({ sectionTitle, artist }: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [query1, setQuery1] = useState('')
    const [query2, setQuery2] = useState('')
    const [query3, setQuery3] = useState('')
    const [query4, setQuery4] = useState('')
    const [query5, setQuery5] = useState('')
    const [allsongs, setAllSongs] = useState(null)
    const [musicVidoes, setMusicVideos] = useState(null)
    const [interviews, setInterviews] = useState(null)
    const [gallery, setGallery] = useState(null)
    const [colloborates, setColloborates] = useState(null)
    const [albums, setAlbums] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [queryobj, setQueryObj] = useState({
        artist: artist,
        sortMode: 'Most Views',
    });
    const [queryobj1, setQueryObj1] = useState({
        artist: artist,
        sortMode: 'Most Views',
    });
    const [queryobj2, setQueryObj2] = useState({
        artist: artist,
        sortMode: 'Recent First',
    });
    const router = useRouter();

    const handleSearchAllSongs = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            if (formData.get('query') == '') {
                const data = await fetchData('/data/getallsongs', 1, 12, artist)
                setAllSongs(data.videos)

            } else {
                const query = {
                    q: formData.get('query'),
                    artist: artist
                }
                const str = JSON.stringify(query);
                const data = await fetchData('/data/getallsongsbysearch', 1, 50, str)
                if (!data.status) {

                }
                setAllSongs(data.videos)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const str = JSON.stringify(queryobj);
        const getData = async () => {
            let data = await fetchData('/data/getallsongsbysort', 1, 32, str)
            data.videos && setAllSongs(data.videos)
            setMusicVideos(data.videos)
        }
        setIsLoading(false)
        getData()
    }, [queryobj])

    useEffect(() => {
        const str = JSON.stringify(queryobj1);
        setIsLoading(true)
        const getData = async () => {
            let data = await fetchData('/data/getallsongsbysort', 1, 32, str, null, null, 'interviews')
            data.videos && setAllSongs(data.videos)
            setInterviews(data.videos)
        }
        setIsLoading(false)
        getData()
    }, [queryobj1])

    useEffect(() => {
        const str = JSON.stringify(queryobj2);
        setIsLoading(true)
        const getData = async () => {
            let data = await fetchData('/data/getgallerybysort', 1, 32, str)
            setGallery(data.gallery)
        }
        setIsLoading(false)
        getData()
    }, [queryobj2])

    const handleSearchMusicVideos = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            if (formData.get('query') == '') {
                const data = await fetchData('/data/getallsongs', 1, 12, artist)

                setMusicVideos(data.videos)
                setIsLoading(false)
            } else {
                const query = {
                    q: formData.get('query'),
                    artist: artist
                }
                const str = JSON.stringify(query);
                const data = await fetchData('/data/getallsongsbysearch', 1, 50, str)

                if (!data.status) {
                    setIsLoading(false)
                }
                setMusicVideos(data.videos)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchAlbums = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            console.log(formData.get('query'));
            if (formData.get('query') == '') {
                const data = await fetchData('/data/albums', 1, 12, artist)
                setAlbums(data.albums)
                setIsLoading(false)
            } else {
                const query = {
                    q: formData.get('query'),
                    artist: artist
                }
                const str = JSON.stringify(query);
                const data = await fetchData('/data/getallalbumsbysearch', 1, 50, str)

                if (!data.status) {
                    setIsLoading(false)
                }
                setAlbums(data.albums)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchColloboration = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            if (formData.get('query') == '') {
                const data = await fetchData('/data/colloborates', 1, 12, artist)
                setColloborates(data.colloborates)
            } else {
                const query = {
                    q: formData.get('query'),
                    artist: artist
                }
                const str = JSON.stringify(query);
                const data = await fetchData('/data/colloboratesbysearch', 1, 50, str)
                setColloborates(data.colloborates)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSearchInterviews = async (e: ChangeEvent<HTMLFormElement>) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const formData = new FormData(e.target)
            if (formData.get('query') == '') {
                const data = await fetchData('/data/getallsongs', 1, 12, artist, null, null, 'interviews')
                setInterviews(data.videos)
            } else {
                const query = {
                    q: formData.get('query'),
                    artist: artist
                }
                const str = JSON.stringify(query);
                const data = await fetchData('/data/getallsongsbysearch', 1, 50, str, null, null, 'interviews')
                setInterviews(data.videos)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSortChange = (newSortMode: { label: string }) => {
        setQueryObj(prevState => ({
            ...prevState,
            sortMode: newSortMode.label,
        }));
    };

    const handleSortChange1 = (newSortMode: { label: string }) => {
        setQueryObj1(prevState => ({
            ...prevState,
            sortMode: newSortMode.label,
        }));
    };

    const handleSortChange2 = (newSortMode: { label: string }) => {
        setQueryObj2(prevState => ({
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
                setMusicVideos(data.videos)
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
                                    All Songs
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
                                    Music Videos
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
                                    Albums
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
                                    Interviews
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
                                    Gallery
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
                                    Colloborations
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
                                    Twitter
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
                        <h3>All Songs</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>

                            <form
                                onSubmit={handleSearchAllSongs}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <input type="text" name="query" onChange={(e) => setQuery1(e.target.value)} value={query1} placeholder='Search All Songs' />
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

                        <div className="row g-4">
                            {isLoading ? (
                                <div className="w100 d-flex justify-content-center">
                                    <Loader />
                                </div>
                            ) : (
                                <>
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
                                        </>
                                    )}
                                </>
                            )}

                        </div>

                    </div>
                    <div
                        className="tab-pane fade"
                        id="profile-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <h3>Music Videos</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>
                            <form
                                onSubmit={handleSearchMusicVideos}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <input type="text" name="query" onChange={(e) => setQuery2(e.target.value)} value={query2} placeholder='Search Music Videos' />
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
                        <div className="row g-4">
                            <div className="row g-4">
                                {isLoading ? (
                                    <div className="w100 d-flex justify-content-center">
                                        <Loader />
                                    </div>
                                ) : (
                                    <>
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
                                        <div className="text-center mt-60 " >
                                            <Link href="#" onClick={async (e) => {
                                                e.preventDefault()
                                                setIsLoading(true)
                                                const data = await fetchData('/data/videos', musicVidoes.length <= 12 ? 2 : musicVidoes.length / 12 + 1, 12, artist)
                                                setMusicVideos((prev: any) => ([...prev, ...data.videos]))
                                                setIsLoading(false)
                                            }} className="cmn__simple2" >
                                                {isLoading ? 'loading...' : 'Load More'}
                                            </Link>
                                        </div>
                                    </>
                                )}

                            </div>

                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="album-tab-pane"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <h3>Albums</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>
                            <form
                                onSubmit={handleSearchAlbums}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <input type="text" name="query" onChange={(e) => setQuery3(e.target.value)} value={query3} placeholder='Search Albums' />
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
                        <div className="row g-4">
                            <div className="row g-4">
                                {isLoading ? (
                                    <div className="w100 d-flex justify-content-center">
                                        <Loader />
                                    </div>
                                ) : (
                                    <>
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
                        <h3>Interviews</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>
                            <form
                                onSubmit={handleSearchInterviews}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <input type="text" name="query" onChange={(e) => setQuery4(e.target.value)} value={query4} placeholder='Search Interviews' />
                                <button type="submit" aria-label="submit button">
                                    <IconSearch />
                                </button>
                            </form>
                            <SelectBoxNew
                                options={sortMode}
                                value={queryobj1.sortMode}
                                onChange={(newValue) => handleSortChange1(newValue)} // Handle changes
                            />
                        </div>
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
                        <h3>Gallery</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>
                            <SelectBoxNew
                                options={gallerySortMode}
                                value={queryobj2.sortMode}
                                onChange={(newValue) => handleSortChange2(newValue)} // Handle changes
                            />
                        </div>
                        <div className="row g-4">
                            {gallery && (
                                <>
                                    {gallery.map((props: any) => (
                                        <div
                                            key={props.id_}
                                            className="col-xxl-2 col-xl-2 col-lg-3 col-md-6 col-sm-3"
                                        >
                                            <ArtistGalleryCard thumbnail={props.thumbnail_url} id_={props.id_} sourceurl={props.source} date={props.date_} />
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
                        <h3>Collaborations</h3>
                        <div className="trending__selected select__lefts d-flex justify-content-between" style={{ marginBottom: 30 }}>
                            <form
                                onSubmit={handleSearchColloboration}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <input type="text" name="query" onChange={(e) => setQuery5(e.target.value)} value={query5} placeholder='Search Colloboration' />
                                <button type="submit" aria-label="submit button">
                                    <IconSearch />
                                </button>
                            </form>
                        </div>
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
