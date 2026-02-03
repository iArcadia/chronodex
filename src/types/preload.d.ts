export {};

declare global {
    interface Window {
        api: {
            createGame: (name: string, logoPath: string|null) => Promise<number>;

            getGames: () => Promise<Array<{
                id: number;
                name: string;
                logo_path: string|null;
            }>>;
        };
    }
}