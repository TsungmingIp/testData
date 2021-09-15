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

function DataB(data) {
  const classes = useStyles();

  const [data2, setData2] = React.useState(null);

  // let newData = data.data;
  React.useEffect(() => {
    fetch("/markets")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData2(data.result);
      })
      .catch((err) => {
        console.log("data got an error", err);
      });
    setInterval(() => {
      fetch("/markets")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData2(data.result);
        })
        .catch((err) => {
          console.log("data got an error", err);
        });
    }, 10000);
  }, []); // console.log("newData page:", newData[0].underlying)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value, 100));
    setPage(0);
  };

  const dataB = data2?.filter(
    (dataB) => dataB.type === "future" && dataB.name.includes("PERP")
  );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataB?.length - page * rowsPerPage);

  return (
    <div>
      <h2>Future Market data</h2>

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
            {data2
              ?.filter(
                (dataB) =>
                  dataB.type === "future" && dataB.name.includes("PERP")
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((future) => (
                <TableRow key={future.name}>
                  <TableCell component="th" scope="row">
                    {future.name}
                  </TableCell>
                  <TableCell align="right">{future.bid}</TableCell>
                  <TableCell align="right">{future.ask}</TableCell>
                  <TableCell align="right">{future.price}</TableCell>
                  <TableCell align="right">
                    {JSON.stringify(future.underlying)}
                  </TableCell>
                  <TableCell align="right">
                    {future.volumeUsd24h.toLocaleString(`en-US`, {
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
          count={dataB?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default DataB;
