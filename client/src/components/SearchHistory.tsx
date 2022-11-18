import { useState } from 'react';
import { ZipInfo } from '../model/ZipInfo';
import ConfirmDialog from './ConfirmDialog';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

function SearchHistory(props: any) {
  const { history, clearHistory } = props;

  const [showClearDialog, setShowClearDialog] = useState(false);

  return (
    <>
      <TableContainer sx={{ minWidth: '45em' }} >
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "ButtonHighlight" }}>
            <TableRow>
              { /* <caption/> */}
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>List of the Last five Searchs </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">postcode</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(history.length) ?
              history.map((row: ZipInfo, idx: number) => (
                <TableRow
                  key={row.postcode + '-' + idx}
                >
                  <TableCell>{row.country}</TableCell>
                  <TableCell align="right">{row.postcode}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                </TableRow>
              ))
              : <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center" }}> search history is empty (please do another search)</TableCell>
              </TableRow>
            }
          </TableBody>
          {(history.length) ?
            <TableFooter sx={{ backgroundColor: "ButtonHighlight" }}>
              <TableRow >
                <TableCell colSpan={4} sx={{ textAlign: "right" }}>
                  <Button variant='outlined' onClick={() => { setShowClearDialog(true) }}>Clear results</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
            : null
          }
        </Table>

      </TableContainer>

      <ConfirmDialog
        title="Clear search history?"
        open={showClearDialog}
        setOpen={setShowClearDialog}
        onConfirm={clearHistory}
      >
        Are you sure you want to clean the search history?
      </ConfirmDialog>
    </>
  );
}

export default SearchHistory;