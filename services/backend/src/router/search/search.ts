import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import { filterSearch, fuzzySearch } from "../../core/search/search";
import { langValidator } from "./validator";

const searchRouter = Router();

searchRouter.get("/filters", keycloak.protect(), langValidator, filterSearch);
searchRouter.get("/fuzzy", keycloak.protect(), langValidator, fuzzySearch);

export default searchRouter;
