import * as React from 'react'
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { sp } from '@pnp/sp';


const Results: React.FC = () => {
    const[resultsList, setResultsList] =  React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const listItemsResponse = await await sp.web.lists.getByTitle("Results").items.select("Id", "Title", "UserEmail", "UserCountry", "UserPhone", "TotalMarks","MarksObtained").orderBy("Modified", true)();
                setResultsList(listItemsResponse);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const resultsData = resultsList.map((item, index) => {
        return {
            name: item.Title,
            email: item.UserEmail,
            country: item.UserCountry,
            phone: item.UserPhone,
            totalMarks: item.TotalMarks,
            marksObtained: item.MarksObtained
        };
    });

    let rows = resultsData;
    const data =()=>{
                return {
                columns:[
                {
                    label: 'Name',
                    field: 'name',
                    width: 150,
                },
                {
                    label: 'Email',
                    field: 'email',
                    width: 270,
                },
                {
                    label: 'Country',
                    field: 'country',
                    width: 200,
                },
                {
                    label: 'Phone',
                    field: 'phone',
                    width: 100,
                },
                {
                    label: 'TotalMarks',
                    field: 'totalMarks',
                    width: 150,
                },
                {
                    label: 'MarksObtained',
                    field: 'marksObtained',
                    width: 150,
                },
            ],
            rows :rows
            }
        }
      return (
        <>
        <h2>User Results</h2>
        <hr />
        <CDBContainer>
          <CDBCard>
            <CDBCardBody>
              <CDBDataTable striped bordered hover data={data()} info={false} materialSearch />
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
        </>
      );
}

export default Results
