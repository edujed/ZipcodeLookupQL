import { useState, useEffect } from 'react';

import { Country } from '../model/Country';
import { ZipInfo } from '../model/ZipInfo';

import SearchHistory from './SearchHistory';
import { prepareRequest } from '../graphql/request';

import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { countryQuery, getZipcodeQuery } from '../graphql/queries';

const baseURL: string = 'http://localhost:8080/GraphQL';

function Lookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [defaultCountry, setDefaultCounty] = useState<Country | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [zipcode, setZipcode] = useState<string>("");
  const [history, setHistory] = useState<ZipInfo[]>(JSON.parse(localStorage.getItem("history") || '[]'));

  function loadCoutries() {
    // show loading message
    setLoading(true);
    // Promises: Country[] 
    fetch(baseURL, prepareRequest(countryQuery))
      .then((res) => {
        if (res.status != 200)
          throw new Error("Error fetching data: " + res.statusText);
        else return res.json();
      })
      .then(({ data: { countries }, error }) => {
        // if (error) throw new Error(error);

        const list: Country[] = countries || [];
        setCountries(list);

        const us: Country | undefined = list.find(c => c.abbreviation == "US");

        setSelectedCountry(us);
        setDefaultCounty(us);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }

  useEffect(() => {
    loadCoutries();
  }, []);

  function addResult(country: string, postcode: string, city: string | null, state: string | null) {
    const result: ZipInfo = {
      country,
      postcode,
      city: (city || "?")
    };
    if (state) result.state = state;
    // console.log('fetch:', result)

    const list = [result].concat((history || []).slice(0, 4));

    setHistory(list);
    localStorage.setItem("history", JSON.stringify(list));

    // clean the last zip search.
    setZipcode('');
    setSelectedCountry(defaultCountry);
  }

  function clearHistory() {
    setHistory([]);
    localStorage.setItem("history", '[]');
  }

  function searchZip(e: React.SyntheticEvent<HTMLFormElement>): boolean {
    e.preventDefault();

    const country = selectedCountry?.abbreviation || "US";

    fetch(baseURL, prepareRequest(getZipcodeQuery(country, zipcode)))
      .then((res) => {
        if (res.status != 200)
          throw new Error("Error fetching data: " + res.statusText);
        else return res.json();
      })
      .then(({ data, error }) => {
        if (!!error) throw new Error(error);
        const { zipcode: { postcode, places } } = data;
        const place = (places?.length) ? places[0] : { city: "not found!" };
        addResult(country, (postcode || zipcode), place?.city, place?.state?.name);

      })
      .catch((error) => {
        // setError(error.message);
        // setHasError(true);
        addResult(country, zipcode, "?", error.message);
      });
    return false;
  }

  return (
    <>
      {
        (!!error) ? <Alert severity="error">{error}</Alert>
          : loading ? <Alert severity="info">Loading Data!</Alert>
            : <form onSubmit={searchZip}>
              <Box sx={{ minWidth: '45em' }} >
                <Stack direction="row" spacing={1}>
                  <Autocomplete
                    id="country"
                    value={selectedCountry}
                    autoHighlight
                    disablePortal
                    autoComplete={true}
                    autoSelect={true}
                    sx={{ width: "25em" }}
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    onChange={(event: React.SyntheticEvent, newValue: Country | null) => {
                      setSelectedCountry(!!newValue ? newValue : defaultCountry);
                    }}
                    renderInput={(params: any) =>
                      <TextField label="Choose a country" type="text" {...params} />
                    }
                  />

                  <TextField
                    id="zip"
                    value={zipcode}
                    label="Zip Code"
                    variant='outlined'
                    required={true}
                    type="text"
                    autoFocus
                    sx={{ width: "10em" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setZipcode(event.target.value)} />

                  <Button type="submit" variant="outlined">Search</Button>

                  {
                    /* for pure debug use
                    <div>{`Selected Country: ${countryValue?.abbreviation ? countryValue.abbreviation : null}`}</div>
                    <div>{`Zip: ${zipValue}`}</div>
                    <hr />
                    */
                  }
                </Stack>
              </Box>
              <br />
            </form>
      }
      <SearchHistory history={history} clearHistory={clearHistory} />
    </>
  );
}

export default Lookup;
