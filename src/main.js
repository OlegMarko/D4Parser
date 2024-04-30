// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor } from 'apify';
import axios from 'axios';
// Crawlee - web scraping and browser automation library (Read more at https://crawlee.dev)
// import { CheerioCrawler } from 'crawlee';

// this is ESM project, and as such, it requires you to specify extensions in your relative imports
// read more about this here: https://nodejs.org/docs/latest-v18.x/api/esm.html#mandatory-file-extensions
// import { router } from './routes.js';

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

const allData = []

async function fetchData(pageNumber = 1) {
  try {
    const response = await axios.post('https://app.mobalytics.gg/api-diablo4/v3/graphql/query', {
      query: `
        query Diablo4($perPage: Int, $filter: Diablo4MetaBuildsFilter, $page: Int = 10, $sort: Diablo4MetaBuildsSortingOption) {
            diablo4 {
                game {
                    metaBuildVariants(filter: $filter, perPage: $perPage, page: $page, sort: $sort) {
                        data {
                            ... on Diablo4MetaBuildVariant {
                                id
                                types {
                                    ... on Diablo4BuildType {
                                        id
                                        name
                                    }
                                }
                                tier {
                                    ... on Diablo4Tier {
                                        name
                                        slug
                                    }
                                }
                                class {
                                    ... on Diablo4Class {
                                        name
                                        slug
                                    }
                                }
                                season {
                                    ... on Diablo4Season {
                                        id
                                        name
                                        seasonMechanics
                                    }
                                }
                                build {
                                    ... on Diablo4CustomBuildV3 {
                                        id
                                        name
                                        season {
                                            ... on Diablo4Season {
                                                id
                                                name
                                                seasonMechanics
                                            }
                                        }
                                        tags
                                        author {
                                            ... on Diablo4CustomAuthor {
                                                name
                                                links {
                                                    ... on Diablo4AuthorLink {
                                                        url
                                                    }
                                                }
                                            }
                                        }
                                        updatedAt
                                        buildSummary
                                        gameplayLoop
                                        variants {
                                            ... on Diablo4Variant {
                                                name
                                                assignedSkills {
                                                    ... on Diablo4AssignedSkill {
                                                        skill {
                                                            ... on Diablo4Skill {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                    }
                                                }
                                                skills {
                                                    skill {
                                                        ... on Diablo4Skill {
                                                            name
                                                            slug
                                                            maxRank
                                                        }
                                                    }
                                                }
                                                gems {
                                                    ... on Diablo4BuildSlottedGem {
                                                        slot {
                                                            ... on Diablo4GemType {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                        gem {
                                                            ... on Diablo4Gem {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                    }
                                                }
                                                gear {
                                                    ... on Diablo4Gear {
                                                        slot {
                                                            ... on Diablo4BuildSlot {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                        aspect {
                                                            ... on Diablo4Aspect {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                        stats {
                                                            ... on Diablo4Stat {
                                                                name
                                                                slug
                                                            }
                                                        }
                                                        item {
                                                            ... on Diablo4UniqueItem {
                                                                slug
                                                                name
                                                            }
                                                        }
                                                    }
                                                }
                                                boons {
                                                    ... on Diablo4DruidBoon {
                                                        type
                                                        value {
                                                            ... on Diablo4Skill {
                                                                id
                                                            }
                                                        }
                                                    }
                                                }
                                                summons {
                                                    ... on Diablo4NecromancerSummon {
                                                        type
                                                        upgrade
                                                        spec {
                                                            ... on Diablo4Skill {
                                                                name
                                                            }
                                                        }
                                                    }
                                                }
                                                specialization {
                                                    ... on Diablo4Skill {
                                                        name
                                                    }
                                                }
                                                expertise {
                                                    ... on Diablo4Skill {
                                                        name
                                                    }
                                                }
                                                enchantments {
                                                    ... on Diablo4Skill {
                                                        name
                                                    }
                                                }
                                                paragonBoards {
                                                    ... on Diablo4BuildParagonBoard {
                                                        board {
                                                            ... on Diablo4ParagonBoard {
                                                                name
                                                            }
                                                        }
                                                        glyph {
                                                            ... on Diablo4ParagonGlyph {
                                                                name
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        pageInfo {
                            ... on Diablo4PaginationInfo {
                                totalPages
                                totalItems
                                hasNextPage
                                hasPreviousPage
                                page
                            }
                        }
                    }
                }
            }
        }
      `,
      variables: {
        perPage: 20,
        filter: {  },
        page: pageNumber,
        // sort: "IS_FEATURED"
      }
    });

    const metaBuildVariants = response?.data?.data?.diablo4?.game?.metaBuildVariants?.data || [];
    const pageInfo = response?.data?.data?.diablo4?.game?.metaBuildVariants?.pageInfo;

    if (metaBuildVariants.length > 0) {
      let data = metaBuildVariants.map(v => prepareData(v));
      allData.push(...data);
    }

    if (pageInfo?.hasNextPage) {
      await fetchData(pageNumber + 1);
    } else {
      let data = []
      allData.map(i => {
        if (i.tier !== 'null') {
          data.push(i);
        }
      })

      console.log(data[0]);

      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

function prepareData(data) {
  let build = data.build

  return {
    build_url: `https://mobalytics.gg/diablo-4/builds/${data.class.slug}/${data.id}`,
    build_name: build.name,
    class: JSON.stringify(data.class),
    tier: JSON.stringify(data.tier),
    tags: JSON.stringify(build.tags),
    summary: build.buildSummary,
    core_skills: prepareCoreSkills(build?.variants[0]?.assignedSkills),
    selected_skills: prepareSelectedSkills(build?.variants[0]?.skills),
    gear: prepareGear(build?.variants[0]?.gear),
    gems: prepareGems(build?.variants[0]?.gems),
    seasonal_mechanic: JSON.stringify(data?.season?.seasonMechanics),
    creator: prepareCreator(build.author),
    last_updated: build.updatedAt,
    leveling_path: prepareLevelingPath(build?.variants[0]?.skills),
    class_mechanic: prepareClassMechanic(build?.variants),
    skill_rotation: build.gameplayLoop,
    paragon: prepareParagon(build?.variants[0]?.paragonBoards),

    str_and_weak: null,
  };
}

function prepareLevelingPath(data) {
  const res = []

  if (data != null) {
    data.map(i => {
      res.push({name: i?.skill?.slug, maxRank: i?.skill?.maxRank});
    })
  }

  return JSON.stringify(res);
}

function prepareCoreSkills(data) {
  const res = []

  data.map(i => {
    res.push(i.skill)
  });

  return JSON.stringify(res);
}

function prepareSelectedSkills(data) {
  const res = []

  data?.map(i => {
    res.push(i.skill)
  });

  return JSON.stringify(res);
}

function prepareParagon(data) {
  return JSON.stringify(data);
}

function prepareCreator(data) {
  return JSON.stringify(data);
}

function prepareGear(data) {
  return JSON.stringify(data);
}
function prepareGems(data) {
  return JSON.stringify(data);
}

function prepareClassMechanic(data) {
  const res = []

  if (data[0].boons) {
    res.push(data[0].boons)
  }
  if (data[0].summons) {
    res.push(data[0].summons)
  }
  if (data[0].specialization) {
    res.push(data[0].specialization)
  }
  if (data[0].expertise) {
    res.push(data[0].expertise)
  }
  if (data[0].enchantments) {
    res.push(data[0].enchantments)
  }

  return JSON.stringify(res);
}

await fetchData();

// Save headings to Dataset - a table-like storage.
await Actor.pushData(allData);

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
