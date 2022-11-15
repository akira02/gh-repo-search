import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Flex,
  Grid,
  Button,
  Center,
  Spinner,
  Link,
  Tag,
  HStack,
  Heading,
  Divider,
} from "@chakra-ui/react";

import { getRepositories, getRepositoriesParameters } from "./api/getRepo";
import type { RepoSearchResult } from "./api/type";
import SortButton from "./components/SortButton";

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<RepoSearchResult>();
  const [keyword, setKeyword] = useState<string>("");
  const [param, setParam] = useState<getRepositoriesParameters>({ q: "" });

  const handelSearch = () => {
    setParam({ q: keyword });
    setPage(1);
  };

  useEffect(() => {
    if (param.q) {
      setLoading(true);
      getRepositories(param).then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [param]);

  return (
    <Box maxWidth="1024px" p="100px">
      <Flex m="10px">
        <Input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button ml="10px" onClick={handelSearch}>
          Search
        </Button>
      </Flex>
      <Flex justifyContent="flex-end" m="10px">
        <SortButton param={param} setParam={setParam} />
      </Flex>

      <Grid minHeight="70vh">
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          data?.items.map((item) => (
            <>
              <Flex flexDirection="column" key={item.id} my="10px">
                <Link href={item.html_url} isExternal>
                  <Heading size="md">{item.full_name}</Heading>
                </Link>
                <Box my="10px">{item.description}</Box>
                <HStack>
                  <Tag>Forks: {item.forks_count}</Tag>
                  <Tag>Stars: {item.stargazers_count}</Tag>
                </HStack>
              </Flex>
              <Divider />
            </>
          ))
        )}
      </Grid>

      <Center>
        <Button
          m="10px"
          onClick={() => {
            const newPageNum = page > 1 ? page - 1 : 1;
            setPage(newPageNum);
            setParam((prev) => ({
              ...prev,
              page: newPageNum,
            }));
          }}
          disabled={page <= 1}
        >
          Prev Page
        </Button>
        {page}
        <Button
          m="10px"
          onClick={() => {
            setPage((prev) => prev + 1);
            setParam((prev) => ({
              ...prev,
              page: page + 1,
            }));
          }}
        >
          Next Page
        </Button>
      </Center>
    </Box>
  );
}

export default App;
