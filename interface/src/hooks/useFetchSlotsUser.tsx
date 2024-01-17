// React
import { useEffect, useState } from "react";
// Graph
import { client, Graph } from "../pages/api/Graph";

export const useFetchSlotsUser = (filter: string) => {
  const [slots, setSlots] = useState<any[]>([]);

  async function fetchSlots() {
    const queryBody = `query MyQuery {
      slotUsers${filter} {
        loan {
          activeLoan
          amountRequest
          amountWithdraw
          deadline
          id
          loanDuration
          nft {
            id
            collection {
              name
              symbol
            }
            uri
          }
          rewards
          tokenToBorrow
          tokenRequest
          supplier
        }
        id
        user {
          id
        }
      }
    }`;

    try {
      let response = await client.query({ query: Graph(queryBody) });
      setSlots(response.data.slotUsers);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  return slots;
};
