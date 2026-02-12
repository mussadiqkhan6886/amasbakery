import React from 'react'

const Category = async ({params}: {params: Promise<{collection: string}>}) => {

  const {collection} = await params
  return (
    <main className='h-[300vh]'>
      <h1>{collection === "all" ? "Menu" : "Occasion Cakes"}</h1>
      <section>
        
      </section>
    </main>
  )
}

export default Category
