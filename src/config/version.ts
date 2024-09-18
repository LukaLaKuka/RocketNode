import { JsonHandler } from "@tomhuel/jsonhandler";
import path from "node:path";
import { paths } from "./paths";

export const version = () => {
    return new JsonHandler(path.resolve(paths.root, 'package.json')).getProperty('version');
};