import React, { HtmlHTMLAttributes, StyleHTMLAttributes } from 'react'
import  { useState,useEffect } from 'react'
import { api,categoryMove,colorType } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight,faX,faMars,faVenus,faQuestionCircle, } from '@fortawesome/free-solid-svg-icons'
import waitForElementTransition from "wait-for-element-transition";

const About = (prop:any) => {
    const {pokemon} = prop
    const [ability, setability] = useState<any>();

    const fetchAbility = async (url:string) => {
        const res = await api(url);
        setability(res);
        // console.log(ability);
      };
      const RatioToPercent = (ratio:number):number => {
        let percent:number = +((100 / (ratio + 1)) * ratio).toFixed(0)
        return percent ;
      };
      let details = document.querySelector(
        ".details-abilities"
      ) as HTMLElement;
  return (
    <>
       <p>
                  {pokemon.species
                    ? pokemon.flavor_text_entries[15].flavor_text
                    : ""}
                </p>
                <div
                  className={`morphology w-7/12 m-auto my-10 flex 
                   flex-row justify-center gap-20 shadow-lg shadow-slate-600 rounded`}
                  style={{
                    backgroundColor: colorType[pokemon?.types[0]?.type?.name],
                  }}
                >
                  <div className="weight my-auto">
                    <p className="text-white my-2 font-bold">Weight</p>
                    <hr />
                    <p className="text-white font-light">{pokemon.weight}</p>
                  </div>
                  <div className="height">
                    <p className="text-white my-2 font-bold ">Height</p>
                    <hr className="" />
                    <p className="text-white font-light">{pokemon.height}</p>
                  </div>
                </div>
                <div
                  className={`general w-[80%] relative py-3 m-auto shadow-lg text-white shadow-slate-600 rounded mb-12`}
                  style={{
                    background: colorType[pokemon?.types[0]?.type?.name],
                  }}
                >
                  <div className="details-abilities absolute w-0  h-full top-0 rounded transition-opacity_2s]  opacity-0 left-0  duration-500 border border-solid border-red-900 items-center  z-10 bg-gray-600 flex-col gap-5 ">
                    <div className="w-full  flex justify-end">
                      <button
                        onClick={() => {
                          details.setAttribute("style", "width:0;opacity:0");
                   
                          waitForElementTransition(
                            details
                          ).then(() => {
                            setability(null);
                          });
                        }}
                        className="bg-gray-800 gap-7 w-10 h-5 rounded-bl "
                      >
                        {" "}
                        {
                          <FontAwesomeIcon
                            icon={faX}
                            className=" text-blue-400"
                          />
                        }
                      </button>
                    </div>
                    {ability ? (
                      <>
                        <h3 className={` underline mb-5`}>{ability?.name}</h3>
                        <p>
                          {Object.keys(ability?.effect_entries).map(
                            (key, index) => {
                              if (
                                ability?.effect_entries[key].language.name ===
                                "en"
                              ) {
                                return (
                                  <>{ability?.effect_entries[key].effect}</>
                                );
                              }
                            }
                          )}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="breading  ml-5  flex flex-col items-start">
                    <h3 className="text-slate-900 w-full font-black">
                      Breading
                    </h3>
                    <div className="Gender flex flex-row gap-4 w-full pl-[20%] justify-start">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        Gender:
                      </h4>
                      <p>
                        {" "}
                        <FontAwesomeIcon
                          icon={faMars}
                          className="text-blue-200"
                        />{" "}
                        {100 - RatioToPercent(pokemon.gender_rate)}
                      </p>
                      <p className="female flex flex-row gap-4 ">
                        <FontAwesomeIcon
                          icon={faVenus}
                          className=" text-pink-400"
                        />{" "}
                        {RatioToPercent(pokemon.gender_rate)}
                      </p>
                    </div>
                    <div className="eggGroup flex flex-row gap-4 justify-start pl-[20%] w-full ">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        Egg group:
                      </h4>
                      <div className="eggType">
                        {" "}
                        {pokemon.egg_groups[0].name}{" "}
                      </div>
                    </div>
                    <div className="eggCycle flex flex-row mx-2/6 w-full justify-start pl-[20%]  gap-4">
                      <h4 className="text-start text-slate-500 w-2/6 ">
                        egg cycle
                      </h4>
                      <div className="eggCycle">
                        {pokemon.types[0].type.name}
                      </div>
                    </div>
                  </div>

                  {/*  */}
                  <div className="abilities ml-5 flex-col">
                    <h2 className="text-slate-900 w-full font-black">
                      {" "}
                      Talents
                    </h2>

                    <div className="talents flex flex-row justify-evenly">
                      {pokemon.abilities?.map((ability) => {
                        return (
                          <>
                            {" "}
                            <div
                              className={`ability-${ability.ability.name} flex gap-2 flex-row`}
                            >
                              {" "}
                              <p key={ability.ability.name}>
                                {ability.ability.name}
                              </p>
                              <FontAwesomeIcon
                                icon={faQuestionCircle}
                                className=" text-blue-400"
                                onClick={async ():Promise<any> => {
                                  await fetchAbility(ability.ability.url);
                                      details.setAttribute('style','width:100%;opacity:1');  
                                }}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/*  */}
                </div>
    </>
  )
}

export default About