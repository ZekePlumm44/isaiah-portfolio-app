
interface NowPlayingProps {
    spotifyStatus: SpotifyStatus;
    loading?: boolean;
}

export default function Listening(props: NowPlayingProps) {
    if (props.loading) {
        return (
            <dl className="list-container"></dl>
        );
    }
    
}