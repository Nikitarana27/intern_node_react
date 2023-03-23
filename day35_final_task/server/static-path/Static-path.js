import path from "path";
import { fileURLToPath } from "url";

export const getCurrentDir = () => {
    return path.dirname(fileURLToPath(import.meta.url));
};
