import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DataA() {
  const classes = useStyles();

  // console.log("newData page:", newData[0].underlying)
  const [data, setData] = React.useState(null);

  //useEffect grabs data and rerenders every 10 seconds

  React.useEffect(() => {
    fetch("/markets")
      .then((res) => {
        // console.log("this is the response:", res);
        return res.json();
      })
      .then((data) => {
        // console.log("this is the data: ", data);
        // console.log("this is the data: ", data.result[0]);
        setData(data.result);
      })
      .catch((err) => {
        console.log("data got an error", err);
      });
    setInterval(() => {
      fetch("/markets")
        .then((res) => {
          // console.log("this is the response:", res);
          return res.json();
        })
        .then((data) => {
          // console.log("this is the data: ", data);
          // console.log("this is the data: ", data.result[0]);
          setData(data.result);
        })
        .catch((err) => {
          console.log("data got an error", err);
        });
    }, 10000);
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value, 100));
    setPage(0);
  };

  const dataA = data?.filter(
    (dataA) => dataA.type === "spot" && dataA.name.includes("USDT")
  );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataA?.length - page * rowsPerPage);

  return (
    <div>
      <h2>SPOT Market data</h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Asset/Contract name</TableCell>
              <TableCell align="right">Bid</TableCell>
              <TableCell align="right">Ask</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Underlying Asset</TableCell>
              <TableCell align="right">
                Volume&nbsp;(USD) Last 24 hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.filter(
                (dataA) => dataA.type === "spot" && dataA.name.includes("USDT")
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((spot) => (
                <TableRow key={spot.name}>
                  <TableCell component="th" scope="row">
                    {spot.name}
                  </TableCell>
                  <TableCell align="right">{spot.bid}</TableCell>
                  <TableCell align="right">{spot.ask}</TableCell>
                  <TableCell align="right">{spot.price}</TableCell>
                  <TableCell align="right">
                    {JSON.stringify(spot.underlying)}
                  </TableCell>
                  <TableCell align="right">
                    {spot.volumeUsd24h.toLocaleString(`en-US`, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <tableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={dataA?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default DataA;
