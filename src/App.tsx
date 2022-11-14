import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Flex,
  Grid,
  Button,
  Center,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
} from "@chakra-ui/react";
import { getRepositories, getRepositoriesParameters } from "./api";
import type { RepoSearchResult } from "./api/type";

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
    <Box>
      <Flex>
        <Input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button onClick={handelSearch}>Search</Button>
      </Flex>

      <Grid minHeight="70vh">
        {loading ? (
          <Spinner />
        ) : (
          data?.items.map((item) => <Box key={item.id}>{item.name}</Box>)
        )}
      </Grid>

      <Center>
        <NumberInput
          size="lg"
          defaultValue={1}
          min={1}
          display="flex"
          value={page}
          onChange={(value) => {
            setPage(Number(value));
            setParam((prev) => ({
              ...prev,
              page: Number(value),
            }));
          }}
        >
          <NumberDecrementStepper children="Prev Page" />
          <NumberInputField />
          <NumberIncrementStepper children="Next Page" />
        </NumberInput>
      </Center>
    </Box>
  );
}

export default App;
