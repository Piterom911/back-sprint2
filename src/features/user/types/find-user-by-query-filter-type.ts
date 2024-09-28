export type FilterType = {
    $or?: ({
        $regex: string;
        $options: string;
    } | {})[];
};