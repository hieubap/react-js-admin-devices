import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TableView({
  columns = [],
  data = [],
  rowClick = () => () => {},
  rowClassName,
}) {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <div style={{ position: "relative", overflow: "scroll" }}>
      <Table style={{ width: "100%", backgroundColor: "white" }}>
        <Thead variant="simple" color="gray.500" mb="24px">
          <Tr>
            {columns.map((prop, key) => {
              return (
                <Th
                  // {...column.getHeaderProps(column.getSortByToggleProps())}
                  // pe="10px"
                  padding={1}
                  key={key}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    alignItems={"center"}
                    // width={prop.width}
                    style={{ width: prop.width }}
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                    textAlign={"center"}
                  >
                    {prop.title}
                  </Flex>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowNum) => {
            return (
              <Tr key={rowNum} className={rowClassName}>
                {columns.map((col, colNum) => {
                  return (
                    <Td
                      key={colNum}
                      onClick={rowClick(rowNum, item)}
                      padding={1}
                      fontSize={{ sm: "14px" }}
                      minW={{ lg: "auto" }}
                      borderColor="transparent"
                      style={{width: col.width}}
                    >
                      {col.renderItem
                        ? col.renderItem(item[col.dataIndex], item, rowNum)
                        : item[col.dataIndex]}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "100%",
          top: 0,
          left: 0,
          bottom: "1rem",
          backgroundColor: "white",
        }}
      >
        <Table
          style={{
            borderRight: "1px solid #eee",
          }}
        >
          <thead className="text-primary">
            <tr>
              {columns
                .filter((c) => c.fixedLeft)
                .map((prop, key) => {
                  return (
                    <th key={key} style={{ width: prop.width }}>
                      {prop.title}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowNum) => {
              return (
                <tr key={rowNum} className={rowClassName}>
                  {columns
                    .filter((c) => c.fixedLeft)
                    .map((col, colNum) => {
                      return (
                        <td
                          key={colNum}
                          onClick={rowClick(rowNum, item)}
                          style={{
                            padding: col.padding,
                            borderLeft: col.borderHor ? "1px solid #eee" : null,
                            borderRight: col.borderHor
                              ? "1px solid #eee"
                              : null,
                          }}
                        >
                          <div
                            style={{
                              width: col.width,
                              overflow: "hidden",
                              textAlign: col.textAlign,
                            }}
                          >
                            {col.renderItem
                              ? col.renderItem(
                                  item[col.dataIndex],
                                  item,
                                  rowNum
                                )
                              : item[col.dataIndex]}
                          </div>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TableView;
