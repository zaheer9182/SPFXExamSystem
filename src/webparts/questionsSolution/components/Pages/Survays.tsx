import * as React from 'react'
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { sp } from '@pnp/sp';


const Survays: React.FC = () => {
    const[SurvaysList, setSurvaysList] =  React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const listItemsResponse = await await sp.web.lists.getByTitle("Survey").items.select("Id", "Title", "Email", "Country", "Phone", "Message").orderBy("Modified", true)();
                setSurvaysList(listItemsResponse);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const SRdata = SurvaysList.map((item, index) => {
        debugger;
        return {
            name: item.Title,
            email: item.Email,
            country: item.Country,
            phone: item.Phone,
            message: item.Message
        };
    });

    let rows = SRdata;
    console.log(rows);
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
                    label: 'Message',
                    field: 'message',
                    width: 150,
                },
            ],
            rows :rows
            }
        }
      return (
        <>
        <h2>User Surveys</h2>
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

export default Survays