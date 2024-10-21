export type QueryFilterDTO = {
    $or?: ({
        $regex: string;
        $options: string;
    } | {})[];
};