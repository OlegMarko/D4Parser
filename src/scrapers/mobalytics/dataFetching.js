import axios from 'axios';

export async function fetchData() {
  const allData = [];

  async function fetchPage(pageNumber = 1) {
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
                                        }
                                    }
                                    build {
                                        ... on Diablo4CustomBuildV3 {
                                            id
                                            name
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
                                                    seneschalCompanion {
                                                        ... on Diablo4BuildSeneschalCompanion {
                                                            governingStone {
                                                                ... on Diablo4BuildGoverningStone {
                                                                    governingStone {
                                                                        ... on Diablo4GoverningStone {
                                                                            name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            tuningStones {
                                                                ... on Diablo4BuildTuningStone {
                                                                    position
                                                                    tuningStone {
                                                                        ... on Diablo4TuningStone {
                                                                            name
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
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
                                                                sectionSlug
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
          filter: {},
          page: pageNumber,
        }
      });

      const metaBuildVariants = response?.data?.data?.diablo4?.game?.metaBuildVariants?.data || [];
      const pageInfo = response?.data?.data?.diablo4?.game?.metaBuildVariants?.pageInfo;

      if (metaBuildVariants.length > 0) {
        metaBuildVariants.forEach(item => {
          if (item.tier !== null) {
            allData.push(item);
          }
        });
      }

      if (pageInfo?.hasNextPage) {
        await fetchPage(pageNumber + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  await fetchPage();

  return allData;
}
