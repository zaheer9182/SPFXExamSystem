import * as React from 'react'
import { IQuestionsSolutionProps } from '../IQuestionsSolutionProps'
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';


const UI: React.FunctionComponent<IQuestionsSolutionProps> = (props: IQuestionsSolutionProps) => {
    const {
        context
      } = props

      const httpClientOptions = {
        headers: new Headers({
            "accept": "application/json",
            "Origin": "https://14jzsq.sharepoint.com",
            "Access-Control-Allow-Origin": "*", // Add Access-Control-Allow-Origin header
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", // Add Access-Control-Allow-Headers header
        }),
        method: 'GET',
        //credentials: 'omit',
        //mode: 'no cors' as RequestMode,
        crossorigin: true,
        credentials: 'omit' as RequestCredentials,
        
    };

    const getUserDetails = (): Promise<any> => {
        let url = "https://timeapi.io/api/TimeZone/AvailableTimeZones";
        // Pass options directly to the get method
        return context.httpClient.get(url, HttpClient.configurations.v1, httpClientOptions)
            .then((response: HttpClientResponse) => {
                return response.json();
            })
            .then((jsonResponse: any) => {
                return jsonResponse;
            }) as Promise<any>;
    };

    React.useEffect(() => {
        getUserDetails()
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
            const url = `https://timeapi.io/api/TimeZone/AvailableTimeZones`;

            const fetchData = async () => {
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json', // adjust headers as needed
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            };
            fetchData();
    }, []);

    return(
        <h1>UI COMP</h1>
    )
}

export default UI