import Skeleton from "react-native-reanimated-skeleton";

export default function Loader_Client_List({width,height}:{width:number,height:number}) {
  const isTablet = width >= 768;

  return (
    <>
    {
      Array.from({ length: isTablet ? 8 : 4}).map((_, index) => (
<Skeleton
key={index}
      isLoading={true}
      containerStyle={{
        width: "90%",
        maxWidth: isTablet ? 700 : 500,
        alignSelf: "center",
        flexDirection: 'row',
        marginTop: 20
      }}
      layout={[
        {
          key: "avatar",
          width: isTablet ? width * 0.10 : width * 0.18,
          height: isTablet ? width * 0.10 : width * 0.18,
          borderRadius: 999,
          marginRight: 12,
        },
        {
          key: "textContainer",
          flexDirection: 'column',
          children: [
            {
              key: "line1",
              width: isTablet ? width * 0.35 : width * 0.55,
              height: 20,
              marginBottom: 6,
            },
            {
              key: "line2",
              width: isTablet ? width * 0.25 : width * 0.40,
              height: 20,
            },
          ]
        }
      ]}
    >
      <></>
    </Skeleton>))

    }
    </>
  );
}