import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
//import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth"; 

export default async function Home({ searchParams } : { searchParams: Promise<{ query?: string}>
}) { 
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);


//  const posts = await client.fetch(STARTUPS_QUERY);

  const { data : posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 11,
  //     author: { _id:1, name: "Abhishek Dhanani" },
  //     _id: 1,
  //     description: 'This is the Startup description',
  //     image:"https://images.unsplash.com/photo-1555231955-348aa2312e19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "flora",
  //     title: "Flora - Planting the future",
  //   },
  // ];


  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">Pitch Your Startup, <br/> Connect with Entreprenuers</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm  query={query} />


      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?(
            posts.map((post: StartupCardType) => ( 
              <StartupCard key={post?._id} post={post} />
            ))
          ):(
            <p className="no-results">No startups found</p>
          )}
        </ul>

      </section>

      <SanityLive />

    </>
  );
}