import Image from 'next/image'
import React from 'react'
import PlayButton from './PlayButton'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setVideoId } from '@/redux/features/modalSlice';
import { formatViewsCount } from '@/components/shared/formattedViews';

type Props = {
    id?: string;
    title?: string;
    location?: string;
    listeners?: number;
    img_?: string;
    id_?: string;
    artist_id?: string;
    artist_name?: string;
    artist_url?: string;
    feat_artists?: string;
    video_id?: string;
    uploader?: string;
    release_date?: Date;
    added_date?: Date;
    category?: string;
    views?: string;
    duration?: number
}

function VideoCard({ img_, title, video_id, uploader, views, release_date, duration }: Props) {
    const dispatch = useDispatch()

    function extractDate(datetimeString: Date) {
        var dateObject = new Date(datetimeString);
        var formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }

    function formatDuration(seconds: any) {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className="moods__item play-button-container card h-100 d-flex flex-column justify-content-between col-12" data-bs-toggle='modal'
            onClick={() => {
                dispatch(setVideoId(video_id))
            }}
            data-bs-target="#playVideoModal">
            <div className="mb-16 ralt transition overhid">
                <Image
                    width={500}
                    src={`https://img.youtube.com/vi/${video_id}/hqdefault.jpg`}
                    className="w-100  transition overhid h-auto"
                    alt="img"
                    height={300}
                />
                <PlayButton
                    audioTrack={false}
                    isPlaying={true}
                    onClick={() => { }}
                />
            </div>
            <div className="content d-flex flex-column">
                <h5 className="mb-2">
                    <Link href={`#`} target='_blank' data-bs-toggle='modal'
                        onClick={() => {
                            dispatch(setVideoId(video_id))
                        }}
                        className="white">
                        {title}
                    </Link>
                </h5>
                <div className='d-flex flex-row justify-content-between'>
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>
                        {uploader}
                    </span>
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>
                        {formatDuration(duration)}
                    </span>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>
                        {views && formatViewsCount(views)} views
                    </span>
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>
                        {extractDate(release_date)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard