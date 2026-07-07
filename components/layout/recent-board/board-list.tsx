import Chip from "./chip";

type boardItem = { abbr: string; name: string };

interface BoardListProps {
  isMounted: boolean;
  recentBoards: boardItem[];
  isDeleteMode: boolean;
  onDelete: (abbr: string) => void;
}

const BoardList = ({ isMounted, recentBoards, isDeleteMode, onDelete }: BoardListProps) => {
  return (
    <>
      {isMounted &&
        recentBoards.map((board) => (
          <Chip
            key={board.abbr}
            as={isDeleteMode ? "button" : "link"}
            href={`/boards/${board.abbr}`}
            onClick={isDeleteMode ? () => onDelete(board.abbr) : undefined}
            className={
              isDeleteMode
                ? "animate-pulse cursor-pointer border-red-300 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                : ""
            }
          >
            <span>{board.name}</span>
          </Chip>
        ))}
    </>
  );
};

export default BoardList;
