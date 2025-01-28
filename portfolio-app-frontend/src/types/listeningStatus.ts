export interface ListeningStatus {
    song: string;
    artists: string[];
    album: string;
    albumArt: string;
    isPlaying: boolean;
    spotifyUrl: string;
    songTitle: string;
    artist: string;
    albumCover?: string;
}