import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { getRepositoriesParameters } from "../api/getRepo";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SortButton = ({
  param,
  setParam,
}: {
  param: getRepositoriesParameters;
  setParam: React.Dispatch<React.SetStateAction<getRepositoriesParameters>>;
}) => {
  const sortText = () => {
    switch (true) {
      case param.sort === "stars" && param.order === "asc":
        return "Fewest stars";
      case param.sort === "stars":
        return "Most stars";
      case param.sort === "forks" && param.order === "asc":
        return "Fewest forks";
      case param.sort === "forks":
        return "Most forks";
      case param.sort === "updated" && param.order === "asc":
        return "Least recently updated";
      case param.sort === "updated":
        return "Recently updated";
      default:
        return "Best match";
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <>Sort: {sortText()}</>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: undefined,
              order: undefined,
            }));
          }}
        >
          Best match
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "stars",
              order: "desc",
            }));
          }}
        >
          Most stars
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "stars",
              order: "asc",
            }));
          }}
        >
          Fewest stars
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "forks",
              order: "desc",
            }));
          }}
        >
          Most forks
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "forks",
              order: "asc",
            }));
          }}
        >
          Fewest forks
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "updated",
              order: "desc",
            }));
          }}
        >
          Recently updated
        </MenuItem>
        <MenuItem
          onClick={() => {
            setParam((prev) => ({
              ...prev,
              sort: "updated",
              order: "asc",
            }));
          }}
        >
          Least recently updated
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortButton;
