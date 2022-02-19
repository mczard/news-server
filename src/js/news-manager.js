import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NewsManager {
    constructor(basePath) {
        this.basePath = basePath;

        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(path.resolve(__dirname, basePath), { recursive: true }, e => {
                if (e) {
                    console.log(`Nie udało się utworzyć ściezki ${path.resolve(__dirname, basePath)}`)
                    throw e;
                } else {
                    console.log(`Utworzono ścieżkę ${path.resolve(__dirname, basePath)}`);
                }
             });
        }
    }

    newsList() {
        const files = fs.readdirSync(path.resolve(__dirname, this.basePath));
        return files.map((file) => file.split('.')[0]);
    }

    addNews(news) {
        const timestamp = Date.now();

        fs.writeFileSync(path.resolve(__dirname, this.basePath, `${timestamp}.txt`), news);

        return timestamp;
    }

    getNewsById(newsId) {
        const filePath = path.resolve(__dirname, this.basePath, `${newsId}.txt`);

        if (fs.existsSync(filePath)) {
            return {
                id: newsId,
                data: fs.readFileSync(filePath, 'utf-8')
            };
        } else {
            return undefined;
        }
    }
}