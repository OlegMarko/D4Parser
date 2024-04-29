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
                                        id
                                        slug
                                        name
                                        color
                                    }
                                }
                                class {
                                    ... on Diablo4Class {
                                        id
                                        slug
                                        name
                                        str
                                        iconUrl
                                        backgroundImageUrl
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
                                        name
                                        class {
                                            ... on Diablo4Class {
                                                id
                                                slug
                                                name
                                                iconUrl
                                                backgroundImageUrl
                                                str
                                            }
                                        }
                                        tier {
                                            ... on Diablo4Tier {
                                                id
                                                name
                                                color
                                                slug
                                            }
                                        }
                                        season {
                                            ... on Diablo4Season {
                                                id
                                                seasonMechanics
                                                startingAt
                                                name
                                            }
                                        }
                                        class {
                                            ... on Diablo4Class {
                                                id
                                                slug
                                                name
                                                iconUrl
                                                backgroundImageUrl
                                            }
                                        }
                                        tags
                                        author {
                                            ... on Diablo4CustomAuthor {
                                                id
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
                                                description
                                                assignedSkills {
                                                    ... on Diablo4AssignedSkill {
                                                        position
                                                        skill {
                                                            ... on Diablo4Skill {
                                                                id
                                                                name
                                                                type {
                                                                    ... on Diablo4SkillType {
                                                                        id
                                                                        slug
                                                                        name
                                                                    }
                                                                }
                                                                section {
                                                                    ... on Diablo4SkillSection {
                                                                        id
                                                                        slug
                                                                        name
                                                                        skills {
                                                                            ... on Diablo4Skill {
                                                                                id
                                                                                slug
                                                                                sectionSlug
                                                                                name
                                                                                iconUrl
                                                                                dependsOn {
                                                                                    ... on Diablo4Skill {
                                                                                        id
                                                                                        slug
                                                                                        name
                                                                                    }
                                                                                }
                                                                                description
                                                                                dependsOnSlugs
                                                                            }
                                                                        }
                                                                        skillsSlugs
                                                                        classSlug
                                                                        iconUrl
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                skills {
                                                    actionType
                                                    skill {
                                                        ... on Diablo4Skill {
                                                            x
                                                            y
                                                            iconUrl
                                                            dependsOnSlugs
                                                            id
                                                            name
                                                            type {
                                                                ... on Diablo4SkillType {
                                                                    id
                                                                    slug
                                                                    name
                                                                }
                                                            }
                                                            section {
                                                                ... on Diablo4SkillSection {
                                                                    id
                                                                    slug
                                                                    name
                                                                    iconUrl
                                                                    class {
                                                                        ... on Diablo4Class {
                                                                            id
                                                                            slug
                                                                            name
                                                                            str
                                                                            iconUrl
                                                                            backgroundImageUrl
                                                                        }
                                                                    }
                                                                    classSlug
                                                                    index
                                                                    requiredRank
                                                                    x
                                                                    y
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                gems {
                                                    ... on Diablo4BuildSlottedGem {
                                                        gem {
                                                            ... on Diablo4Gem {
                                                                id
                                                                name
                                                                iconUrl
                                                                bonuses {
                                                                    ... on Diablo4Bonus {
                                                                        description
                                                                        slot {
                                                                            ... on Diablo4GemType {
                                                                                id
                                                                                slug
                                                                                name
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                gear {
                                                    ... on Diablo4Gear {
                                                        item {
                                                            ... on Diablo4UniqueItem {
                                                                id
                                                                name
                                                                iconUrl
                                                                description
                                                                type {
                                                                    ... on Diablo4UniqueItemType {
                                                                        id
                                                                        slug
                                                                        name
                                                                    }
                                                                }
                                                                class {
                                                                    ... on Diablo4Class {
                                                                        id
                                                                        slug
                                                                        str
                                                                        name
                                                                        iconUrl
                                                                        backgroundImageUrl
                                                                    }
                                                                }
                                                                effect
                                                                mainStats
                                                                secondaryStats
                                                            }
                                                        }
                                                    }
                                                }
                                                assignedSkillsDescription
                                                skillTreeDescription
                                                gearStatsDescription
                                                paragonBoardDescription
                                                senechalConstructDescription
                                                aspectsAndUniquesDescription
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
        perPage: 10,
        filter: { seasons: ["season"], archived: false },
        page: pageNumber,
        sort: "IS_FEATURED"
      }
    });

    const metaBuildVariants = response?.data?.data?.diablo4?.game?.metaBuildVariants?.data || [];
    const pageInfo = response?.data?.data?.diablo4?.game?.metaBuildVariants?.pageInfo;

    if (metaBuildVariants.length > 0) {
      let data = metaBuildVariants.map(v => prepareData(v.build));
      allData.push(...data);
    }

    if (pageInfo?.hasNextPage) {
      await fetchData(pageNumber + 1);
    } else {
      console.log(allData);
    }
  } catch (error) {
    console.error(error.response.data);
  }
}

function prepareData(build) {
  return {
    build_url: null,
    build_name: build.name,
    class: JSON.stringify(build.class),
    tier: JSON.stringify(build.tier),
    tags: JSON.stringify(build.tags),
    summary: build.buildSummary,
    core_skills: JSON.stringify(build?.variants[0]?.assignedSkills),
    str_and_weak: null,
    selected_skills: JSON.stringify(build?.variants[0]?.skills),
    leveling_path: null,
    class_mechanic: null,
    skill_rotation: null,
    gear: JSON.stringify(build?.variants[0]?.gear),
    gems: JSON.stringify(build?.variants[0]?.gems),
    seasonal_mechanic: build?.season?.seasonMechanics,
    paragon: null,
    creator: JSON.stringify(build.author),
    last_updated: build.updatedAt,
  };
}

await fetchData();


// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit()
await Actor.exit();
