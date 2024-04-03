import Image from 'next/image'
import React from 'react'
import PlayButton from './PlayButton'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setVideoId } from '@/redux/features/modalSlice';
import { formatViewsCount } from '@/components/shared/formattedViews';

type Props = {
    id_?: string;
    artist_id?: string;
    artist_name?: string;
    artist_url?: number;
    name_?: string;
    label?: string;
    release_date?: Date;
    img_?: string;
}

function AlbumCard({ img_, artist_name, name_, label, release_date }: Props) {

    const dispatch = useDispatch()

    function extractDate(datetimeString: any) {
        var dateObject = new Date(datetimeString);
        var formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }

    return (
        <div className="moods__item play-button-container card h-100 d-flex flex-column justify-content-between col-12" data-bs-toggle='modal'
            onClick={() => {
                // dispatch(setVideoId(video_id))
            }}
            data-bs-target="#playVideoModal">
            <div className="mb-16 ralt transition overhid">
                <Image
                    width={500}
                    src={`https://ersy.com/img/album/${img_}`}
                    // src={`/img22/img/album/${img_}`}
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
                <div className='d-flex flex-row justify-content-between'>
                    <h5 className="mb-2 white">
                        {name_}
                    </h5>
                    <span style={{ color: 'white', fontSize: '0.8rem' }}>
                        {extractDate(release_date)}
                    </span>
                </div>
                <span style={{ color: 'white', fontSize: '0.8rem' }}>
                    {label}
                </span>
                <div className="responsive-table white">
                    <table>
                        <thead>
                            <tr>
                                <th >Duration 00:13:24</th>
                                <th>Official Duration 02:34:43</th>
                            </tr>
                            <tr>
                                <th> Tracks 3</th>
                                <th> Official Tracks 34</th>
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default AlbumCard