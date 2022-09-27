import React from 'react'
import { colorType } from '../../utils'
const BaseStats = (prop:any) => {
  const {pokemon} = prop
  return (
    <>
      <div className="baseStats mb-6 py-4 flex flex-col gap-5 w-[90%] mx-auto rounded" style={{background: colorType[pokemon?.types[0].type?.name]}}>
        {pokemon.stats.map((stat:any, index:number) => {
          return (
            <div key={index} className="stat flex flex-row gap-5 h-[16%] px-3">
              <div className="statName font-semibold text-[12px] text sm:text-sm md:text-base w-[45%] sm:w-[25%] md:w-[20%] lg:w-[15%] text-left">{stat.stat.name}</div>
              <div className='statValue flex flex-row w-[100%] gap-5'>
                <div className="value">
                  {stat.base_stat}
                </div>
                <div className="statValueBar shadow w-[100%] rounded ">
                  <div className="bar rounded bg-white h-[100%]" style={{width: `${(stat.base_stat / 250) * 100}%`}}></div>
                </div>
              </div>                
            </div>
          );
        })}
      </div>
          {/* <div
                  style={{
                    backgroundColor: colorType[pokemon?.types[0]?.type?.name],
                  }}
                  className="stats flex flex-row justify-around w-[90%] rounded  m-auto "
                >
                  <div className="stat flex flex-row items-center gap-3 text-center h-[300px] rounded-t   w-full">
                    {pokemon.stats?.map((stat:any) => {
                      return (
                        <div key={stat.stat.name}
                          className={` ${stat.stat.name}  flex flex-col justify-start gap-2 w-[16%] p-[5px] h-full max-w-[15%]`}
                        >
                          <div className="bar h-[230px]  content-between rounded-b-md rotate-180 shadow">
                            <div
                              className="barProgress rounded-b-md bg-white"
                              style={{
                                height: `${(stat.base_stat / 250) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className="information text-white font-[600]">
                            <div className="stat">{stat.base_stat}</div>
                            <div className="name">{stat.stat.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div> */}
    </>
  )
}

export default BaseStats