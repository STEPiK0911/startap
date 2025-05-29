import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Button,
  Stack,
  Avatar,
  useTheme,
  Popover,
  Slider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  Share as ShareIcon,
  Directions as DirectionsIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

type Place = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isFavorite: boolean;
  location: string;
};

const recommendationPlaces = [
  {
    id: 8,
    title: 'Ресторан "У моря"',
    description: "Ресторан морской кухни с панорамным видом на залив",
    image:
      "https://i.pinimg.com/originals/9a/8b/82/9a8b821f4ac7eb15c1c2f165ebcae202.jpg",
    rating: 4.7,
    reviews: 124,
    category: "Рестораны",
    isFavorite: true,
    location: "Санкт-Петербург, наб. реки Мойки, 12",
  },
  {
    id: 10,
    title: "Парк Горького",
    description: "Крупнейший парк культуры и отдыха в центре города",
    image: "https://su-19.com/wp-content/uploads/2024/01/pg1-1.jpg",
    rating: 4.9,
    reviews: 356,
    category: "Парки",
    isFavorite: true,
    location: "Москва, Крымский Вал, 9",
  },
  {
    id: 13,
    title: "Музей современного искусства",
    description: "Коллекция современного искусства XX-XXI веков",
    image:
      "https://traland.ru/wp-content/uploads/2021/10/musei-sovremennogo-iskustva.jpg",
    rating: 4.5,
    reviews: 87,
    category: "Музеи",
    isFavorite: true,
    location: "Москва, ул. Петровка, 25",
  },
  {
    id: 12,
    title: 'Кофейня "Братья"',
    description: "Уютная кофейня с авторскими десертами",
    image:
      "https://avatars.mds.yandex.net/i?id=26684551f1ac395dcba3565f8be34777476441e5-4819767-images-thumbs&n=13",
    rating: 4.8,
    reviews: 215,
    category: "Кафе",
    isFavorite: true,
    location: "Санкт-Петербург, ул. Рубинштейна, 15",
  },
  {
    id: 95,
    title: "Театр оперы и балета",
    description: "Один из ведущих музыкальных театров России",
    image:
      "https://www.yacobsonballet.ru/content/news/25/258f07b3111980627b5af7ee9e5df131-bezymyannyy.jpg",
    rating: 4.9,
    reviews: 412,
    category: "Театры",
    isFavorite: true,
    location: "Москва, Театральная пл., 1",
  },
  {
    id: 86,
    title: 'Горнолыжный курорт "Снежный"',
    description: "Курорт с трассами для всех уровней подготовки",
    image: "https://md-hotel.ru/wp-content/uploads/2023/12/kurort.jpg",
    rating: 4.6,
    reviews: 178,
    category: "Активный отдых",
    isFavorite: true,
    location: "Красная Поляна, ул. Горная, 5",
  },
];

const FavoritesPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [ratingFilter, setRatingFilter] = useState<[number, number]>([0, 5]);
  const [appliedRatingFilter, setAppliedRatingFilter] = useState<
    [number, number]
  >([0, 5]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRatingFilter(newValue as [number, number]);
  };

  const resetFilters = () => {
    setRatingFilter([0, 5]);
  };
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };
  const [places, setPlaces] = useState<Place[]>([
    {
      id: 1,
      title: 'Ресторан "У моря"',
      description: "Ресторан морской кухни с панорамным видом на залив",
      image:
        "https://i.pinimg.com/originals/9a/8b/82/9a8b821f4ac7eb15c1c2f165ebcae202.jpg",
      rating: 4.7,
      reviews: 124,
      category: "Рестораны",
      isFavorite: true,
      location: "Санкт-Петербург, наб. реки Мойки, 12",
    },
    {
      id: 2,
      title: "Парк Горького",
      description: "Крупнейший парк культуры и отдыха в центре города",
      image: "https://su-19.com/wp-content/uploads/2024/01/pg1-1.jpg",
      rating: 3,
      reviews: 356,
      category: "Парки",
      isFavorite: true,
      location: "Москва, Крымский Вал, 9",
    },
    {
      id: 3,
      title: "Музей современного искусства",
      description: "Коллекция современного искусства XX-XXI веков",
      image:
        "https://traland.ru/wp-content/uploads/2021/10/musei-sovremennogo-iskustva.jpg",
      rating: 1,
      reviews: 87,
      category: "Музеи",
      isFavorite: true,
      location: "Москва, ул. Петровка, 25",
    },
    {
      id: 4,
      title: 'Кофейня "Братья"',
      description: "Уютная кофейня с авторскими десертами",
      image:
        "https://avatars.mds.yandex.net/i?id=26684551f1ac395dcba3565f8be34777476441e5-4819767-images-thumbs&n=13",
      rating: 2,
      reviews: 215,
      category: "Кафе",
      isFavorite: true,
      location: "Санкт-Петербург, ул. Рубинштейна, 15",
    },
    {
      id: 5,
      title: "Театр оперы и балета",
      description: "Один из ведущих музыкальных театров России",
      image:
        "https://www.yacobsonballet.ru/content/news/25/258f07b3111980627b5af7ee9e5df131-bezymyannyy.jpg",
      rating: 3.3,
      reviews: 412,
      category: "Театры",
      isFavorite: true,
      location: "Москва, Театральная пл., 1",
    },
    {
      id: 6,
      title: 'Горнолыжный курорт "Снежный"',
      description: "Курорт с трассами для всех уровней подготовки",
      image: "https://md-hotel.ru/wp-content/uploads/2023/12/kurort.jpg",
      rating: 4.8,
      reviews: 178,
      category: "Активный отдых",
      isFavorite: true,
      location: "Красная Поляна, ул. Горная, 5",
    },
  ]);

  const toggleFavorite = (id: number) => {
    setPlaces(
      places.map((place) =>
        place.id === id ? { ...place, isFavorite: !place.isFavorite } : place
      )
    );
  };

  const handleApplyFilters = () => {
    setAppliedRatingFilter(ratingFilter);
    handleFilterClose();
  };

  const filteredPlaces = places
    .filter((place) => place.isFavorite)
    .filter((place) => {
      const matchesSearch =
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRating =
        place.rating >= appliedRatingFilter[0] &&
        place.rating <= appliedRatingFilter[1];

      return matchesSearch && matchesRating;
    })
    .sort((a, b) =>
      sortDirection === "desc" ? b.rating - a.rating : a.rating - b.rating
    );

  return (
    <Box sx={{ margin: "0 auto", paddingTop: 5, paddingBottom: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="white">
          Избранные места
        </Typography>
        <Typography variant="subtitle1" color="white">
          {filteredPlaces.length} сохранённых мест
        </Typography>
      </Stack>

      {/* Поиск и фильтры */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 0,
          background: "white",
          boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Поиск по избранным местам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  background: theme.palette.background.paper,
                },
              }}
              color="grey"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
              sx={{
                borderRadius: 3,
                py: 1.5,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
                background: "grey !important",
                color: "white !important",
              }}
              color="grey"
            >
              Фильтры
            </Button>
            <Popover
              open={Boolean(filterAnchorEl)}
              anchorEl={filterAnchorEl}
              onClose={handleFilterClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                mt: 1,
                "& .MuiPaper-root": {
                  p: 3,
                  borderRadius: 2,
                  minWidth: 300,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Фильтры</Typography>
                <IconButton onClick={handleFilterClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Typography gutterBottom>Рейтинг</Typography>
              <Slider
                value={ratingFilter}
                onChange={handleRatingChange}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5, label: "5" },
                ]}
                sx={{ mb: 3 }}
                color="grey"
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={resetFilters}
                  variant="outlined"
                  sx={{ mr: 1 }}
                  color="grey"
                >
                  Сбросить
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  variant="contained"
                  sx={{ ml: 1 }}
                  color="grey"
                >
                  Применить
                </Button>
              </Box>
            </Popover>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<StarIcon />}
              endIcon={
                sortDirection === "desc" ? (
                  <ArrowDownwardIcon fontSize="small" />
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )
              }
              sx={{
                borderRadius: 3,
                py: 1.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                },
                background: "grey !important",
                color: "white !important",
              }}
              onClick={toggleSortDirection}
            >
              По рейтингу
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Результаты поиска */}
      {filteredPlaces.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            p: 5,
            borderRadius: 4,
            background: theme.palette.background.default,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: theme.palette.action.hover,
              mb: 2,
              margin: "0 auto",
            }}
          >
            <FavoriteIcon fontSize="large" color="disabled" />
          </Avatar>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchQuery ? "Ничего не найдено" : "Ваш список избранного пуст"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery
              ? "Попробуйте изменить параметры поиска"
              : "Сохраняйте понравившиеся места, чтобы вернуться к ним позже"}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "grey !important",
                color: "white !important",
              }}
              href="/"
            >
              Найти интересные места
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPlaces.map((place) => (
            <Grid item key={place.id} xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 0,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[8],
                  },
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={place.image}
                    alt={place.title}
                    sx={{
                      objectFit: "cover",
                      transition: "transform 0.5s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => toggleFavorite(place.id)}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    <FavoriteIcon
                      color={place.isFavorite ? "error" : "disabled"}
                      sx={{
                        fontSize: "1.5rem",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    />
                  </IconButton>
                  <Chip
                    label={place.category}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      backgroundColor: theme.palette.background.paper,
                      fontWeight: "bold",
                      boxShadow: theme.shadows[2],
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6" fontWeight="bold">
                      {place.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {place.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <LocationIcon
                        fontSize="small"
                        color="grey"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {place.location}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          value={place.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {place.rating.toFixed(1)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 0.5 }}
                        >
                          ({place.reviews})
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" color="grey">
                          <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="grey">
                          <DirectionsIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>

                <Box sx={{ px: 3, pb: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      borderWidth: 2,
                      "&:hover": { borderWidth: 2 },
                      color: "grey !important",
                    }}
                  >
                    Подробнее
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {recommendationPlaces.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
            Рекомендованные для вас
          </Typography>
          <Typography variant="body1" color="white" sx={{ mb: 3 }}>
            Места, которые могут вас заинтересовать
          </Typography>

          <Grid container spacing={3}>
            {recommendationPlaces
              .filter(
                (place) =>
                  !places.some((p) => p.id === place.id && p.isFavorite)
              )
              .slice(0, 3)
              .map((place) => (
                <Grid item key={place.id} xs={12} sm={6} lg={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 0,
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows[8],
                      },
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={place.image}
                        alt={place.title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.5s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => toggleFavorite(place.id)}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "rgba(255,255,255,0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.9)",
                          },
                        }}
                      >
                        <FavoriteIcon
                          color={place.isFavorite ? "error" : "disabled"}
                          sx={{
                            fontSize: "1.5rem",
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        />
                      </IconButton>
                      <Chip
                        label={place.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          backgroundColor: theme.palette.background.paper,
                          fontWeight: "bold",
                          boxShadow: theme.shadows[2],
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={1.5}>
                        <Typography variant="h6" fontWeight="bold">
                          {place.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {place.description}
                        </Typography>

                        <Box
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <LocationIcon
                            fontSize="small"
                            color="grey"
                            sx={{ mr: 0.5 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {place.location}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={place.rating}
                              precision={0.1}
                              readOnly
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" fontWeight="bold">
                              {place.rating.toFixed(1)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ ml: 0.5 }}
                            >
                              ({place.reviews})
                            </Typography>
                          </Box>

                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" color="grey">
                              <ShareIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="grey">
                              <DirectionsIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>

                    <Box sx={{ px: 3, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="medium"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: "bold",
                          borderWidth: 2,
                          "&:hover": { borderWidth: 2 },
                          color: "grey !important",
                        }}
                      >
                        Подробнее
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;
