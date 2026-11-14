// 테넌트 목록은 공개하지 않는다. 각 팀은 자기 주소(otel.proofer.tech/{tenant})로 들어온다.
export default function OtelRoot() {
  return (
    <main className="mx-auto max-w-[560px] px-6 py-24">
      <h1 className="text-2xl font-bold">프루퍼 OTel</h1>
      <p className="mt-3 text-proofer-gray">
        팀에 안내받은 주소(otel.proofer.tech/팀이름)로 접속해 주세요.
      </p>
    </main>
  );
}
